import React from 'react';
import Skeleton from './Skeleton';
import './Navbar.css'; // Reuse container layout if needed

const SkeletonProduct = () => {
    return (
        <div className="product-page container" style={{ paddingTop: '100px' }}>
            <div className="product-layout" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                
                {/* Image Gallery Skeleton */}
                <div className="product-gallery" style={{ flex: '1 1 500px' }}>
                    <Skeleton height="600px" width="100%" style={{ marginBottom: '20px' }} />
                    <div className="thumbnail-gallery" style={{ display: 'flex', gap: '10px' }}>
                        <Skeleton width="80px" height="100px" />
                        <Skeleton width="80px" height="100px" />
                        <Skeleton width="80px" height="100px" />
                        <Skeleton width="80px" height="100px" />
                    </div>
                </div>

                {/* Product Details Skeleton */}
                <div className="product-details" style={{ flex: '1 1 400px' }}>
                    <Skeleton width="100px" height="14px" style={{ marginBottom: '10px' }} /> {/* ID */}
                    <Skeleton className="skeleton-h1" width="80%" /> {/* Title */}
                    <Skeleton className="skeleton-h2" width="150px" style={{ marginBottom: '20px' }} /> {/* Price */}

                    <div style={{ marginBottom: '30px' }}>
                        <Skeleton className="skeleton-p" />
                        <Skeleton className="skeleton-p" />
                        <Skeleton className="skeleton-p" width="60%" />
                    </div>

                    <div className="product-actions" style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                        <Skeleton height="50px" width="200px" /> {/* Add to Cart */}
                        <Skeleton height="50px" width="50px" /> {/* Share */}
                        <Skeleton height="50px" width="50px" /> {/* Compare */}
                    </div>

                    {/* Accordions */}
                    <div className="product-accordions">
                        <Skeleton height="50px" width="100%" style={{ marginBottom: '10px' }} />
                        <Skeleton height="50px" width="100%" style={{ marginBottom: '10px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonProduct;
