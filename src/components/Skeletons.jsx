'use client';

import React from 'react';

// Product Page Skeleton
export const ProductSkeleton = () => {
    return (
        <div className="product-page container">
            <div className="product-layout">
                {/* Image Gallery Skeleton */}
                <div className="product-gallery">
                    <div className="skeleton-box" style={{
                        height: '65vh',
                        width: '100%',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        animation: 'skeleton-pulse 1.5s ease-in-out infinite'
                    }} />
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="skeleton-box" style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'var(--color-bg-tertiary)',
                                animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                                animationDelay: `${i * 0.1}s`
                            }} />
                        ))}
                    </div>
                </div>

                {/* Details Skeleton */}
                <div className="product-details">
                    <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                        <div className="skeleton-box" style={{
                            width: '100px',
                            height: '16px',
                            marginBottom: '12px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: '4px',
                            animation: 'skeleton-pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="skeleton-box" style={{
                            width: '80%',
                            height: '32px',
                            marginBottom: '16px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: '4px',
                            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.1s'
                        }} />
                        <div className="skeleton-box" style={{
                            width: '150px',
                            height: '28px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: '4px',
                            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.2s'
                        }} />
                    </div>

                    <div className="skeleton-box" style={{
                        width: '100%',
                        height: '60px',
                        marginBottom: '32px',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        borderRadius: '4px',
                        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                        animationDelay: '0.3s'
                    }} />

                    <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                        <div className="skeleton-box" style={{
                            flex: 1,
                            height: '52px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-sm)',
                            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.4s'
                        }} />
                        <div className="skeleton-box" style={{
                            width: '52px',
                            height: '52px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-sm)',
                            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.5s'
                        }} />
                        <div className="skeleton-box" style={{
                            width: '52px',
                            height: '52px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-sm)',
                            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                            animationDelay: '0.6s'
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Shop Page Skeleton
export const ShopSkeleton = () => {
    return (
        <div className="shop-container container">
            <div className="category-header">
                <div className="skeleton-box" style={{
                    width: '200px',
                    height: '40px',
                    margin: '0 auto 24px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: '4px',
                    animation: 'skeleton-pulse 1.5s ease-in-out infinite'
                }} />
            </div>
            <div className="product-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <ProductCardSkeleton key={i} delay={i * 0.1} />
                ))}
            </div>
        </div>
    );
};

// Product Card Skeleton (reusable)
export const ProductCardSkeleton = ({ delay = 0 }) => {
    return (
        <div className="product-card">
            <div className="skeleton-box" style={{
                aspectRatio: '3/4',
                width: '100%',
                backgroundColor: 'var(--color-bg-tertiary)',
                animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                animationDelay: `${delay}s`
            }} />
            <div className="product-info">
                <div className="skeleton-box" style={{
                    width: '60px',
                    height: '12px',
                    marginBottom: '8px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: '4px',
                    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                    animationDelay: `${delay + 0.1}s`
                }} />
                <div className="skeleton-box" style={{
                    width: '100%',
                    height: '16px',
                    marginBottom: '8px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: '4px',
                    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                    animationDelay: `${delay + 0.2}s`
                }} />
                <div className="skeleton-box" style={{
                    width: '80px',
                    height: '14px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: '4px',
                    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                    animationDelay: `${delay + 0.3}s`
                }} />
            </div>
        </div>
    );
};

// Related Products Skeleton
export const RelatedProductsSkeleton = () => {
    return (
        <div className="related-products-section" style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--color-border)' }}>
            <div className="skeleton-box" style={{
                width: '200px',
                height: '32px',
                margin: '0 auto 24px',
                backgroundColor: 'var(--color-bg-tertiary)',
                borderRadius: '4px',
                animation: 'skeleton-pulse 1.5s ease-in-out infinite'
            }} />
            <div className="product-grid">
                {[1, 2, 3, 4].map(i => (
                    <ProductCardSkeleton key={i} delay={i * 0.1} />
                ))}
            </div>
        </div>
    );
};

// Home Page Skeleton
export const HomeSkeleton = () => {
    return (
        <>
            {/* Hero Skeleton */}
            <div className="skeleton-box" style={{
                height: '90vh',
                width: '100%',
                backgroundColor: 'var(--color-bg-tertiary)',
                animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                marginBottom: '80px'
            }} />

            {/* Products Section Skeleton */}
            <div className="container">
                <div className="skeleton-box" style={{
                    width: '250px',
                    height: '40px',
                    margin: '0 auto 60px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: '4px',
                    animation: 'skeleton-pulse 1.5s ease-in-out infinite'
                }} />
                <div className="product-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <ProductCardSkeleton key={i} delay={i * 0.05} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductSkeleton;
