'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Search as SearchIcon } from 'lucide-react';
import { products } from '../data/products';
import './Search.css';

const Search = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const router = useRouter(); // Changed from navigate
    const [isMobile, setIsMobile] = useState(false); // Changed to false initially to avoid hydration error

    useEffect(() => {
        // Run on client only
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        // Don't generate preview results on mobile to keep UI clean as requested
        if (isMobile) {
            setResults([]);
            return;
        }

        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const searchProducts = () => {
            const normalizedQuery = query.toLowerCase().trim();
            const words = normalizedQuery.split(/\s+/);
            const isNumericSearch = /^\d+$/.test(normalizedQuery);

            // Priority 0: Exact ID match
            if (isNumericSearch) {
                const idMatches = products.filter(p => p.id.toString() === normalizedQuery);
                if (idMatches.length > 0) {
                    setResults(idMatches);
                    return;
                }
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

            setResults(allMatches.slice(0, 20));
        };

        const debounce = setTimeout(searchProducts, 200);
        return () => clearTimeout(debounce);
    }, [query, isMobile]);

    const handleClose = () => {
        setQuery('');
        setResults([]);
        onClose();
    };

    const handleSearchSubmit = () => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`); // Changed from navigate
            handleClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-overlay" onClick={handleClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-header">
                    <div className="search-input-wrapper">
                        <SearchIcon
                            size={20}
                            className="search-input-icon"
                            onClick={handleSearchSubmit}
                            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            className="search-input"
                            placeholder={isMobile ? "Search..." : "Search by name, category, or ID..."}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button className="search-close-btn" onClick={handleClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Only show results preview on Desktop/Tablet */}
                {!isMobile && (
                    <div className="search-results">
                        {query && results.length === 0 && (
                            <div className="search-no-results">
                                <p>No products found for "{query}"</p>
                                <p className="text-sm text-subtle">Try different keywords or product ID</p>
                            </div>
                        )}

                        {results.length > 0 && (
                            <div className="search-results-grid">
                                {results.map(product => (
                                    <Link
                                        href={`/product/${product.slug}`}
                                        key={product.id}
                                        className="search-result-item"
                                        onClick={handleClose}
                                    >
                                        <img src={product.image} alt={product.name} className="search-result-image" />
                                        <div className="search-result-info">
                                            <p className="search-result-name">{product.name}</p>
                                            <p className="search-result-meta">
                                                <span className="search-result-id">ID: {product.id}</span>
                                                <span className="search-result-price">$ {product.price.toLocaleString()}</span>
                                            </p>
                                            <p className="search-result-category">{product.category} {product.subCategory && `• ${product.subCategory}`}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {results.length > 0 && (
                            <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
                                <button
                                    onClick={handleSearchSubmit}
                                    className="btn btn-outline"
                                    style={{ width: '100%', maxWidth: '300px' }}
                                >
                                    View All {results.length} Results
                                </button>
                            </div>
                        )}

                        {!query && (
                            <div className="search-hints">
                                <p className="text-subtle">Start typing to search products...</p>
                                <div className="search-suggestions">
                                    <span>Try: "hoodie" or ID like "1", "2", "3"</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
