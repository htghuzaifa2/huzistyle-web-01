'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import Link from 'next/link';
import { products } from '../data/products';
import { shuffleArray } from '../utils/shuffle';

const HomeClient = ({ initialProducts = [] }) => {
    const [displayProducts, setDisplayProducts] = useState(initialProducts);
    const [showLoadPrevious, setShowLoadPrevious] = useState(false);

    const masterListRef = useRef([]);
    const visibleWindowRef = useRef({ start: 0, end: 0 });
    const loadingRef = useRef(false);
    const observerRef = useRef(null);
    const loadingIndicatorRef = useRef(null);
    const scrollPreserveRef = useRef({ isPrepending: false, previousHeight: 0 });

    const BATCH_SIZE = 24;
    const MAX_VISIBLE_ITEMS = 72;
    const [hasMore, setHasMore] = useState(true);

    const updateDisplay = () => {
        const { start, end } = visibleWindowRef.current;
        const slice = masterListRef.current.slice(start, end);
        setDisplayProducts(slice);
        setShowLoadPrevious(start > 0);
        setHasMore(end < masterListRef.current.length);
    };

    useEffect(() => {
        if (!products || !Array.isArray(products)) return;
        const shuffled = shuffleArray([...products]);
        const preparedProducts = shuffled.map(p => ({
            ...p,
            uniqueKey: `${p.id}-${Date.now()}-${Math.random()}`
        }));
        masterListRef.current = preparedProducts;
        if (displayProducts.length > 0) {
            visibleWindowRef.current = { start: 0, end: displayProducts.length };
            setHasMore(displayProducts.length < masterListRef.current.length);
        } else {
            const initialCount = Math.min(BATCH_SIZE, preparedProducts.length);
            visibleWindowRef.current = { start: 0, end: initialCount };
            updateDisplay();
        }
    }, []);

    useLayoutEffect(() => {
        if (scrollPreserveRef.current.isPrepending) {
            const newHeight = document.documentElement.scrollHeight;
            const diff = newHeight - scrollPreserveRef.current.previousHeight;
            window.scrollBy(0, diff);
            scrollPreserveRef.current.isPrepending = false;
        }
    }, [displayProducts]);

    const loadMore = useCallback(() => {
        if (loadingRef.current) return;
        const totalItems = masterListRef.current.length;
        const { end } = visibleWindowRef.current;
        if (end >= totalItems) return;
        loadingRef.current = true;
        setTimeout(() => {
            try {
                let { start } = visibleWindowRef.current;
                let newEnd = end + BATCH_SIZE;
                if (newEnd > totalItems) newEnd = totalItems;
                if (newEnd - start > MAX_VISIBLE_ITEMS) start = newEnd - MAX_VISIBLE_ITEMS;
                visibleWindowRef.current = { start, end: newEnd };
                updateDisplay();
            } catch (error) {
                console.error('Error loading more products:', error);
            } finally {
                loadingRef.current = false;
            }
        }, 400);
    }, []);

    const loadPrevious = () => {
        scrollPreserveRef.current = { isPrepending: true, previousHeight: document.documentElement.scrollHeight };
        let { start, end } = visibleWindowRef.current;
        const newStart = Math.max(0, start - BATCH_SIZE);
        visibleWindowRef.current = { start: newStart, end };
        updateDisplay();
    };

    useEffect(() => {
        const options = { root: null, rootMargin: '200px', threshold: 0.1 };
        observerRef.current = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && hasMore) loadMore();
        }, options);
        if (loadingIndicatorRef.current && hasMore) {
            observerRef.current.observe(loadingIndicatorRef.current);
        }
        return () => { if (observerRef.current) observerRef.current.disconnect(); };
    }, [loadMore, hasMore]);

    if (!products || !Array.isArray(products)) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Error loading products.</div>;
    }

    return (
        <div className="home-page">
            {/* Hero */}
            <section className="hero" aria-label="Welcome to Huzi Style">
                <div className="hero-content">
                    <h1 className="hero-title">Huzi Style</h1>
                    <p className="hero-subtitle">
                        Precision Craftsmanship &mdash; Elite Aesthetics &mdash; Shipped Worldwide
                    </p>
                    <div className="hero-actions">
                        <Link href="/shop" className="btn btn-primary">Shop Now</Link>
                        <Link href="/collections" className="btn btn-outline">Collections</Link>
                    </div>
                </div>
            </section>

            {/* Trust bar */}
            <div className="trust-bar" role="list" aria-label="Shopping guarantees">
                <div className="container">
                    <div className="trust-bar-inner">
                        <div className="trust-item" role="listitem">
                            <span className="trust-icon" aria-hidden="true">✦</span>
                            <span>Worldwide Shipping</span>
                        </div>
                        <div className="trust-divider" aria-hidden="true"></div>
                        <div className="trust-item" role="listitem">
                            <span className="trust-icon" aria-hidden="true">✦</span>
                            <span>Custom Sizing</span>
                        </div>
                        <div className="trust-divider" aria-hidden="true"></div>
                        <div className="trust-item" role="listitem">
                            <span className="trust-icon" aria-hidden="true">✦</span>
                            <span>Premium Fabrics</span>
                        </div>
                        <div className="trust-divider" aria-hidden="true"></div>
                        <div className="trust-item" role="listitem">
                            <span className="trust-icon" aria-hidden="true">✦</span>
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section className="section container" style={{ marginTop: '3rem' }} aria-label="Featured Products">
                <div className="section-header text-center mb-10">
                    <h2 className="h2 section-title">Featured Collections</h2>
                    <div className="section-divider mx-auto"></div>
                    <p className="section-subtitle text-muted">Exclusively curated — masterfully crafted</p>
                </div>

                {showLoadPrevious && (
                    <div className="text-center mb-8">
                        <button onClick={loadPrevious} className="btn btn-outline load-prev-btn" aria-label="Load previous products">
                            Load Previous
                        </button>
                    </div>
                )}

                <div className="product-grid" role="list" aria-label="Product listing">
                    {displayProducts.map((product) => (
                        <article key={product.uniqueKey} className="product-card" role="listitem" itemScope itemType="https://schema.org/Product">
                            <Link href={`/product/${product.slug}`} className="product-image-wrapper" aria-label={`View ${product.name}`}>
                                <img
                                    src={product.image}
                                    alt={`${product.name} — Premium Streetwear by Huzi Style`}
                                    className="product-image"
                                    loading="lazy"
                                    decoding="async"
                                    width={400}
                                    height={533}
                                    style={{ objectFit: 'cover' }}
                                    itemProp="image"
                                />
                                <div className="product-overlay" aria-hidden="true">
                                    <span className="quick-view-btn">View Details</span>
                                </div>
                            </Link>
                            <div className="product-info">
                                <Link href={`/product/${product.slug}`} className="product-title" itemProp="name">{product.name}</Link>
                                <div className="product-meta">
                                    <span className="product-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                        <span itemProp="priceCurrency" content="USD">$</span>
                                        <span itemProp="price" content={product.price}>{product.price.toLocaleString()}</span>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {hasMore && (
                    <div className="loading-indicator" ref={loadingIndicatorRef} aria-live="polite" aria-label="Loading more products">
                        <div className="spinner" aria-hidden="true"></div>
                        <p>Loading more&hellip;</p>
                    </div>
                )}

                {!hasMore && displayProducts.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-light)', fontSize: '13px', letterSpacing: '0.08em' }}>
                        ALL PRODUCTS SHOWN
                    </div>
                )}
            </section>

            {/* Brand story section for SEO */}
            <section className="brand-story-section" aria-label="About Huzi Style">
                <div className="container">
                    <div className="brand-story-content">
                        <h2 className="brand-story-title">Born in Pakistan. Designed for the World.</h2>
                        <p className="brand-story-text">
                            Huzi Style is where streetwear culture meets artisanal craftsmanship. 
                            Each piece is made with intention — premium fabrics, precise stitching, 
                            and silhouettes that move with you. From Lahore to London, our community 
                            wears their identity with pride.
                        </p>
                        <Link href="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeClient;
