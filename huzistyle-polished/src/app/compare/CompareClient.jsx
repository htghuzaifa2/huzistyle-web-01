'use client';

import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import '../../styles/ContentPage.css';

export default function CompareClient() {
    const { compareList, removeFromCompare } = useCompare();
    const { addToCart } = useCart();

    if (compareList.length === 0) {
        return (
            <div className="content-page" style={{ textAlign: 'center' }}>
                <div className="content-header">
                    <h1 className="page-title">Compare Products</h1>
                    <p className="page-subtitle">No products selected for comparison.</p>
                </div>
                <Link href="/shop" className="btn btn-primary">
                    <ShoppingBag size={18} />
                    Browse Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="content-page">
            <div className="content-header">
                <h1 className="page-title">Compare Products</h1>
                <p className="page-subtitle">Side by side comparison of {compareList.length} product{compareList.length > 1 ? 's' : ''}</p>
            </div>

            {/* Mobile-Friendly Card Grid */}
            <div className="compare-grid">
                {compareList.map(product => (
                    <div key={product.id} className="compare-card">
                        {/* Remove Button */}
                        <button
                            onClick={() => removeFromCompare(product.id)}
                            className="compare-remove-btn"
                            title="Remove from compare"
                        >
                            <X size={18} />
                        </button>

                        {/* Product Image */}
                        <Link href={`/product/${product.slug}`} className="compare-image">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                            />
                        </Link>

                        {/* Product Info */}
                        <div className="compare-info">
                            <Link href={`/product/${product.slug}`} className="compare-name">
                                {product.name}
                            </Link>
                            <div className="compare-price">
                                $ {product.price.toLocaleString()}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="compare-details">
                            <div className="compare-detail-row">
                                <span className="compare-label">Category</span>
                                <span className="compare-value">{product.category}</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Product ID</span>
                                <span className="compare-value compare-id">{product.id}</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Availability</span>
                                <span className="compare-value compare-stock">In Stock</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Material</span>
                                <span className="compare-value">Premium Cotton Blend</span>
                            </div>
                            {product.description && (
                                <div className="compare-description">
                                    <span className="compare-label">Description</span>
                                    <p>{product.description.substring(0, 120)}...</p>
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => addToCart(product, 1)}
                            className="btn btn-primary compare-add-btn"
                        >
                            <ShoppingBag size={16} />
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty Slots Tip */}
            {compareList.length < 4 && (
                <div className="compare-tip">
                    <p>You can add {4 - compareList.length} more product{4 - compareList.length > 1 ? 's' : ''} to compare.</p>
                    <Link href="/shop" className="btn btn-secondary btn-outline">
                        Find More Products
                        <ArrowRight size={16} />
                    </Link>
                </div>
            )}
        </div>
    );
}
