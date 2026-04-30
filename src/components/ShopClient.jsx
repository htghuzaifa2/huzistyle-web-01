'use client';

import React, { useState, useEffect, useMemo, useRef, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { products, gamingSubCategories, productTypes, categories as staticCategories } from '../data/products';
import { useCompare } from '../context/CompareContext';
import { Filter, Scale } from 'lucide-react';
import { ShopSkeleton } from './Skeletons';

const ShopClient = ({ categoryParam, subCategoryParam, initialProducts = [] }) => {
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    // ... existing hooks ...

    // ... (inside map) ... placeholder removed

    const router = useRouter(); // FIX: Initialize router
    const pathname = usePathname();
    // const searchParams = useSearchParams(); // If we need query params

    const [sortBy, setSortBy] = useState('newest'); // Default & Fixed
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [productTypeFilter, setProductTypeFilter] = useState('All');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Infinite Scroll State

    const BATCH_SIZE = 24;
    const [displayProducts, setDisplayProducts] = useState(initialProducts);
    const [visibleCount, setVisibleCount] = useState(initialProducts.length || 24);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadingRef = useRef(false);
    const observerRef = useRef(null);
    const loadingIndicatorRef = useRef(null);
    const containerRef = useRef(null);

    // Unified Categories List
    const categories = useMemo(() => ['All', 'Men', 'Women', 'Kids', 'Couple', 'Gaming Outfits', 'Hoodie', 'Jacket', 'Ghost of Yotei'], []);

    // Filter & Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Identify active category
        if (activeCategory === 'Ghost of Yotei') {
            result = result.filter(p => p.subCategory === 'Ghost of Yotei');
        } else if (activeCategory === 'Gaming Outfits') {
            result = result.filter(p => p.category === 'Gaming Outfits');
        } else if (activeCategory === 'Hoodie' || activeCategory === 'Jacket') {
            result = result.filter(p => p.productType === activeCategory);
        } else if (activeCategory !== 'All') {
            // Normal Category Filter (Men, Women, Kids)
            result = result.filter(p =>
                p.category === activeCategory ||
                (p.secondaryCategories && p.secondaryCategories.includes(activeCategory))
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-low-high':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'oldest':
                result.sort((a, b) => a.id - b.id);
                break;
            case 'newest':
            default:
                result.sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [activeCategory, sortBy]);


    // Initialize display products when filtered products change
    useEffect(() => {
        // We now render immediately for visibility
        if (displayProducts.length > 0 && displayProducts[0]?.id === filteredProducts[0]?.id) {
            setHasMore(filteredProducts.length > displayProducts.length);
            return;
        }


        const initialCount = Math.min(BATCH_SIZE, filteredProducts.length);
        setDisplayProducts(filteredProducts.slice(0, initialCount));
        setHasMore(filteredProducts.length > initialCount);
    }, [filteredProducts]);

    const loadMore = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setTimeout(() => {
            setDisplayProducts(prev => {
                const nextCount = prev.length + BATCH_SIZE;
                const nextBatch = filteredProducts.slice(0, nextCount);
                setHasMore(filteredProducts.length > nextCount);
                return nextBatch;
            });
            setIsLoading(false);
        }, 500);
    }, [isLoading, hasMore, filteredProducts]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && hasMore) {
                loadMore();
            }
        }, options);
        observerRef.current = observer;

        if (loadingIndicatorRef.current && hasMore) {
            observer.observe(loadingIndicatorRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMore, hasMore]);



    // Initialize from Params
    useEffect(() => {
        if (categoryParam) {
            const paramName = categoryParam.toLowerCase();
            let targetCategory = 'All';
            if (paramName === 'gaming-outfits') targetCategory = 'Gaming Outfits';
            else if (paramName === 'ghost-of-yotei') targetCategory = 'Ghost of Yotei';
            else if (paramName === 'hoodies') targetCategory = 'Hoodie';
            else if (paramName === 'jackets') targetCategory = 'Jacket';
            else targetCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

            setActiveCategory(targetCategory);
            setActiveSubCategory(null);
        } else {
            setActiveCategory('All');
            setActiveSubCategory(null);
        }
        setProductTypeFilter('All');
    }, [categoryParam, subCategoryParam]);

    return (
        <div className="shop-container container" ref={containerRef}>
            {/* Category Header (Title Only - Pills Removed) */}
            <div className="category-header">
                {activeCategory !== 'All' && (
                    <h1 className="h2 mb-6" style={{ marginTop: '20px' }}>
                        {activeCategory === 'Hoodie' ? 'Hoodies' : activeCategory === 'Jacket' ? 'Jackets' : activeCategory}
                    </h1>
                )}
            </div>


            <div className="shop-layout-single-col">
                {/* Top Filter Bar - Sort Only (Product Type Removed) */}
                <div className="shop-toolbar mb-8" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div className="toolbar-group">
                        <label className="toolbar-label">Sort By:</label>
                        <select
                            className="toolbar-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Latest (New to Old)</option>
                            <option value="oldest">Oldest (Old to New)</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid & Pagination */}
                <main className="shop-main">
                    <div className="product-grid">
                        {displayProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <Link href={`/product/${product.slug}`} className="product-image-wrapper">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-overlay">
                                        <button className="btn btn-secondary quick-view-btn">View Details</button>
                                        <button
                                            className={`btn btn-icon ${isInCompare(product.id) ? 'bg-primary text-white' : 'bg-white text-black'}`}
                                            style={{ marginTop: '8px', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (isInCompare(product.id)) {
                                                    removeFromCompare(product.id);
                                                } else {
                                                    addToCompare(product);
                                                }
                                            }}
                                            title={isInCompare(product.id) ? "Remove from Compare" : "Add to Compare"}
                                        >
                                            <Scale size={20} />
                                        </button>
                                    </div>
                                </Link>
                                <div className="product-info">
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: '500', marginBottom: '4px', display: 'block' }}>
                                        ID: {product.id}
                                    </span>
                                    <Link href={`/product/${product.slug}`} className="product-title">{product.name}</Link>
                                    <div className="product-meta">
                                        <span className="product-price">$ {product.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Infinite Scroll Loading Indicator */}
                    {hasMore && (
                        <div className="loading-indicator" ref={loadingIndicatorRef} style={{ padding: '40px 0', textAlign: 'center' }}>
                            <div className="spinner"></div>
                            <p>Loading products...</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopClient;
