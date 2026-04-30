'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, X } from 'lucide-react';
import { products } from '../data/products';
import '../styles/Shop.css'; // Import global shop styles for product cards

// We need a wrapper component for Suspense too if we were to export it directly, but let's do the logic here.
const SearchClient = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [query, setQuery] = useState(q || '');

    useEffect(() => {
        if (q) {
            setQuery(q);
        }
    }, [q]);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const normalizedQuery = query.toLowerCase().trim();
        const words = normalizedQuery.split(/\s+/);
        const isNumericSearch = /^\d+$/.test(normalizedQuery);

        // Priority 0: Exact ID match
        if (isNumericSearch) {
            const idMatches = products.filter(p => p.id.toString() === normalizedQuery);
            if (idMatches.length > 0) return idMatches;
        }

        // Priority 1: Partial ID match
        let idPartialMatches = [];
        if (isNumericSearch) {
            idPartialMatches = products.filter(p => p.id.toString().includes(normalizedQuery));
        }

        // Priority 2: First word exact match
        let firstWordMatches = products.filter(p => {
            const name = p.name.toLowerCase();
            const nameWords = name.split(/\s+/);
            return nameWords.some(word => word.startsWith(words[0]));
        });

        // Priority 3: Any word exact match
        let anyWordMatches = products.filter(p => {
            const name = p.name.toLowerCase();
            return words.every(queryWord =>
                name.split(/\s+/).some(nameWord => nameWord.startsWith(queryWord))
            );
        });

        // Priority 4: Fuzzy match
        let fuzzyMatches = products.filter(p => {
            const searchableText = `${p.name} ${p.category} ${p.subCategory || ''} ${p.productType}`.toLowerCase();
            return words.some(word => searchableText.includes(word));
        });

        // Combine results
        const allMatches = [
            ...idPartialMatches,
            ...firstWordMatches.filter(p => !idPartialMatches.find(m => m.id === p.id)),
            ...anyWordMatches.filter(p =>
                !idPartialMatches.find(m => m.id === p.id) &&
                !firstWordMatches.find(m => m.id === p.id)
            ),
            ...fuzzyMatches.filter(p =>
                !idPartialMatches.find(m => m.id === p.id) &&
                !firstWordMatches.find(m => m.id === p.id) &&
                !anyWordMatches.find(m => m.id === p.id)
            )
        ];

        return allMatches;
    }, [query]);

    const BATCH_SIZE = 24;
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

    // Reset visible count when query changes
    useEffect(() => {
        setVisibleCount(BATCH_SIZE);
    }, [query]);

    const visibleResults = useMemo(() => {
        return results.slice(0, visibleCount);
    }, [results, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + BATCH_SIZE);
    };

    return (
        <div className="search-results-page">
            <div className="container">
                <div className="search-page-header">
                    <h1 className="h2">Search Products</h1>

                    <form onSubmit={(e) => { e.preventDefault(); window.history.pushState(null, '', `?q=${encodeURIComponent(query.trim())}`); }} className="search-page-form">
                        <div className="search-page-input-wrapper">
                            <SearchIcon size={20} className="search-page-icon" />
                            <input
                                type="text"
                                className="search-page-input"
                                placeholder="Search by name, category, or ID..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="search-page-clear"
                                    onClick={() => { setQuery(''); window.history.pushState(null, '', `?q=`); }}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>

                {query && (
                    <div className="search-results-info">
                        <p>
                            {results.length > 0
                                ? `Found ${results.length} ${results.length === 1 ? 'product' : 'products'} for "${query}"`
                                : `No products found for "${query}"`
                            }
                        </p>
                    </div>
                )}

                {!query && (
                    <div className="search-hints-page">
                        <p className="text-muted">Start typing to search for products...</p>
                        <div className="search-suggestions">
                            <span>Try: "hoodie" or ID like "1", "2", "3"</span>
                        </div>
                    </div>
                )}

                {visibleResults.length > 0 && (
                    <>
                        <div className="product-grid">
                            {visibleResults.map((product) => (
                                <div key={product.id} className="product-card">
                                    <Link href={`/product/${product.slug}`} className="product-image-wrapper">
                                        <img src={product.image} alt={product.name} className="product-image" />
                                        <div className="product-overlay">
                                            <button className="btn btn-secondary quick-view-btn">View Details</button>
                                        </div>
                                    </Link>
                                    <div className="product-info">
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: '500', marginBottom: '4px', display: 'block' }}>
                                            ID: {product.id}
                                        </span>
                                        <Link href={`/product/${product.slug}`} className="product-title">{product.name}</Link>
                                        <div className="product-meta">
                                            <span className="product-price">$ {product.price.toLocaleString()}</span>
                                            <div className="product-rating">★★★★★</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {visibleCount < results.length && (
                            <div className="pagination-container" style={{ textAlign: 'center', marginTop: '40px' }}>
                                <button
                                    className="btn btn-outline"
                                    onClick={handleLoadMore}
                                    style={{ minWidth: '200px' }}
                                >
                                    Load More Products
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchClient;
