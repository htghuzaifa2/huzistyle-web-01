'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { products } from '../data/products';
import { ShoppingBag, Maximize2, X, ChevronLeft, ChevronRight, Share2, Copy, Check, Scale } from 'lucide-react';
import { ProductSkeleton, RelatedProductsSkeleton } from './Skeletons';
// import '../pages/Product.css';

const ProductClient = ({ slug }) => {
    const { addToCart } = useCart();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [lightboxZoom, setLightboxZoom] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState('description');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const foundProduct = products.find(p => p.slug === slug);
        setProduct(foundProduct);
        setSelectedImage(0);
        // window.scrollTo(0, 0); // Next.js handles this
    }, [slug]);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setLightboxZoom(1);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLightboxOpen]);

    // Logic to get 11 related products (Same category first, then random/others)
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!product) return;

        // Logic to get 10 related products (Same category first, then random/others)
        const getRelatedProducts = () => {
            const getCategories = (p) => {
                if (p.categories) return p.categories;
                if (p.category) return [p.category];
                return [];
            };

            const currentCategories = getCategories(product);

            // 1. Get same category products (excluding current)
            let sameCategory = products.filter(p => {
                if (p.id === product.id) return false;
                const pCats = getCategories(p);
                // Check if they share ANY category
                return pCats.some(c => currentCategories.includes(c));
            });

            // Randomize same category
            sameCategory.sort(() => 0.5 - Math.random());

            // 2. Get other products (excluding current and already found)
            const sameIds = new Set(sameCategory.map(p => p.id));
            let others = products.filter(p => p.id !== product.id && !sameIds.has(p.id));

            // Randomize others
            others.sort(() => 0.5 - Math.random());

            // 3. Combine and slice to 10
            return [...sameCategory, ...others].slice(0, 10);
        };

        setRelatedProducts(getRelatedProducts());
    }, [product]);

    if (!product) {
        return <ProductSkeleton />;
    }

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMousePos({ x, y });
    };

    const openLightbox = () => setIsLightboxOpen(true);
    const closeLightbox = () => setIsLightboxOpen(false);

    const nextImage = (e) => {
        e?.stopPropagation();
        setSelectedImage((prev) => (prev + 1) % (product.images?.length || 1));
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setSelectedImage((prev) => (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1));
    };

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) nextImage();
        if (isRightSwipe) prevImage();
    };

    const handleDoubleTap = (e) => {
        e.stopPropagation();
        setLightboxZoom(prev => prev === 1 ? 2.5 : 1);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title || product.name,
                    text: `Check out ${product.title || product.name} on Huzi Style!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            handleCopyLink();
        }
    };

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    // Handle new images array of objects vs old array of strings/single image string
    const getImageUrl = (img) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.url;
    };

    const getImgAlt = (img, idx) => {
        if (typeof img === 'object' && img.alt) return img.alt;
        return `${product.title || product.name} - Luxury Detail View ${idx + 1} | Huzi Style Elite Collection`;
    };

    const currentImageSrc = product.images && product.images.length > 0 && product.images[selectedImage]
        ? getImageUrl(product.images[selectedImage])
        : product.image;

    const hasMultipleImages = product.images && product.images.length > 1;

    // Helper to get formatted ID
    const displayId = product.id;

    return (
        <div className="product-page container">
            <div className="product-layout">
                <div className="product-gallery">
                    <div
                        className="main-image-container"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={handleMouseMove}
                        onClick={openLightbox}
                    >
                        <img
                            src={currentImageSrc}
                            alt={product.title || product.name}
                            className="main-image"
                            style={{
                                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                                transform: isZoomed ? 'scale(2)' : 'scale(1)'
                            }}
                        />

                        {hasMultipleImages && (
                            <>
                                <button className="gallery-nav prev" onClick={prevImage}>
                                    <ChevronLeft size={24} />
                                </button>
                                <button className="gallery-nav next" onClick={nextImage}>
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        <button className="expand-btn" onClick={(e) => { e.stopPropagation(); openLightbox(); }}>
                            <Maximize2 size={20} />
                        </button>
                    </div>

                    {hasMultipleImages && (
                        <div className="thumbnail-gallery">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail-card ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={getImageUrl(img)} alt={getImgAlt(img, index)} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-details slide-up">
                    <div className="product-header">
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '8px', display: 'block' }}>Product ID: {displayId}</span>
                        <h1 className="product-title-large">{product.title || product.name}</h1>
                        <p className="product-price-large">{product.currency === 'USD' ? '$' : (product.currency || '$')} {product.price.toLocaleString()}</p>
                    </div>

                    <div className="product-short-desc">
                        <p>{product.shortDescription || (product.description ? product.description.split('.')[0] + '.' : '')}</p>
                    </div>

                    <div className="product-actions">
                        <button
                            className="btn btn-primary add-to-cart-btn"
                            onClick={() => addToCart(product, 1)}
                        >
                            <ShoppingBag size={20} /> Add to Cart
                        </button>

                        <button className="action-btn" onClick={handleShare} title="Share">
                            <Share2 size={20} />
                        </button>

                        <button
                            className={`action-btn ${product && isInCompare(product.id) ? 'active' : ''}`}
                            onClick={() => product && (isInCompare(product.id) ? removeFromCompare(product.id) : addToCompare(product))}
                            title={product && isInCompare(product.id) ? "Remove from Compare" : "Add to Compare"}
                            style={{ color: product && isInCompare(product.id) ? 'var(--color-primary)' : undefined }}
                        >
                            <Scale size={20} />
                        </button>

                        <button className="action-btn" onClick={handleCopyLink} title="Copy Link">
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>

                    <div className="product-accordions">
                        <div className="accordion-item">
                            <button
                                className={`accordion-header ${activeAccordion === 'description' ? 'active' : ''}`}
                                onClick={() => toggleAccordion('description')}
                            >
                                <span>Description</span>
                                <ChevronRight size={16} className={`accordion-icon ${activeAccordion === 'description' ? 'rotate' : ''}`} />
                            </button>
                            <div className={`accordion-content ${activeAccordion === 'description' ? 'open' : ''}`}>
                                <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <button
                                className={`accordion-header ${activeAccordion === 'features' ? 'active' : ''}`}
                                onClick={() => toggleAccordion('features')}
                            >
                                <span>Specifications</span>
                                <ChevronRight size={16} className={`accordion-icon ${activeAccordion === 'features' ? 'rotate' : ''}`} />
                            </button>
                            <div className={`accordion-content ${activeAccordion === 'features' ? 'open' : ''}`}>
                                <div className="product-features-list">
                                    <div className="feature-row">
                                        <span className="feature-label">Categories</span>
                                        <span className="feature-value">{product.categories ? product.categories.join(', ') : product.category}</span>
                                    </div>

                                    {product.specs ? (
                                        Object.entries(product.specs).map(([key, value]) => (
                                            <div className="feature-row" key={key}>
                                                <span className="feature-label" style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="feature-value">{value.toString()}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            {/* Fallback for old data without specs */}
                                            <div className="feature-row">
                                                <span className="feature-label">Warranty</span>
                                                <span className="feature-value">1 Year Official</span>
                                            </div>
                                            <div className="feature-row">
                                                <span className="feature-label">Shipping</span>
                                                <span className="feature-value">Flat $10 worldwide</span>
                                            </div>
                                        </>
                                    )}

                                    {product.notes && (
                                        <div className="feature-row" style={{ marginTop: '10px', fontStyle: 'italic' }}>
                                            <span className="feature-label">Note</span>
                                            <span className="feature-value">{product.notes}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isLightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <X size={32} />
                    </button>

                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-nav prev" onClick={prevImage}>
                            <ChevronLeft size={40} />
                        </button>

                        <div
                            className="lightbox-image-wrapper"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onDoubleClick={handleDoubleTap}
                        >
                            <img
                                src={currentImageSrc}
                                alt={product.title || product.name}
                                className="lightbox-image"
                                style={{ transform: `scale(${lightboxZoom})` }}
                            />
                        </div>

                        <button className="lightbox-nav next" onClick={nextImage}>
                            <ChevronRight size={40} />
                        </button>
                    </div>

                    <div className="lightbox-thumbnails" onClick={e => e.stopPropagation()}>
                        {product.images && product.images.map((img, index) => (
                            <button
                                key={index}
                                className={`thumbnail-card ${selectedImage === index ? 'active' : ''}`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img src={getImageUrl(img)} alt={getImgAlt(img, index)} />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {relatedProducts.length > 0 && (
                <div className="related-products-section fade-in delay-200">
                    <h2 className="h2 mb-6" style={{ textAlign: 'center', width: '100%' }}>You May Also Like</h2>
                    <div className="product-grid">
                        {relatedProducts.map((rp) => (
                            <div key={rp.id} className="product-card">
                                <Link href={`/product/${rp.slug}`} className="product-image-wrapper">
                                    <img
                                        src={rp.images ? getImageUrl(rp.images[0]) : rp.image}
                                        alt={rp.title || rp.name}
                                        className="product-image"
                                    />
                                </Link>
                                <div className="product-info">
                                    <Link href={`/product/${rp.slug}`} className="product-title">{rp.title || rp.name}</Link>
                                    <div className="product-meta">
                                        <span className="product-price">{rp.currency === 'USD' ? '$' : (rp.currency || '$')} {rp.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductClient;
