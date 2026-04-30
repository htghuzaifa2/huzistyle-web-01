'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Sun, Moon, Monitor, Zap, Home, Heart, ShoppingCart, Grid, Globe, MessageCircle, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import SearchModal from './Search';
import './Navbar.css';

const Navbar = () => {
    const { setIsCartOpen, getCartCount } = useCart();
    const { themeMode, setTheme } = useTheme();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const themeMenuRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const cartCount = getCartCount();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
                setIsThemeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path + '/'));

    return (
        <>
            <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-container">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="logo">Huzi Style</Link>

                    <nav className="nav-links desktop-nav">
                        <Link href="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>Shop</Link>
                        <Link href="/collections" className={`nav-link ${isActive('/collections') ? 'active' : ''}`}>Collections</Link>
                        <Link href="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>Blog</Link>
                        <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
                        <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
                    </nav>

                    <div className="nav-actions">
                        <div className="theme-switcher" ref={themeMenuRef}>
                            <button
                                className="icon-btn theme-btn"
                                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                                aria-label="Change theme"
                            >
                                {mounted ? (
                                    <>
                                        {themeMode === 'light' && <Sun size={20} />}
                                        {themeMode === 'dark' && <Moon size={20} />}
                                        {themeMode === 'neon-navy' && <Zap size={20} />}
                                        {themeMode === 'system' && <Monitor size={20} />}
                                    </>
                                ) : (
                                    <div style={{ width: 20, height: 20 }} /> // Placeholder to prevent layout shift
                                )}
                            </button>
                            {isThemeMenuOpen && (
                                <div className="theme-menu">
                                    <button onClick={() => { setTheme('light'); setIsThemeMenuOpen(false); }} className={themeMode === 'light' ? 'active' : ''}>
                                        <Sun size={16} /> Light
                                    </button>
                                    <button onClick={() => { setTheme('dark'); setIsThemeMenuOpen(false); }} className={themeMode === 'dark' ? 'active' : ''}>
                                        <Moon size={16} /> Dark
                                    </button>
                                    <button onClick={() => { setTheme('neon-navy'); setIsThemeMenuOpen(false); }} className={themeMode === 'neon-navy' ? 'active' : ''}>
                                        <Zap size={16} /> Neon
                                    </button>
                                    <button onClick={() => { setTheme('system'); setIsThemeMenuOpen(false); }} className={themeMode === 'system' ? 'active' : ''}>
                                        <Monitor size={16} /> System
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className="icon-btn"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search products"
                        >
                            <Search size={20} />
                        </button>

                        <button
                            className="icon-btn cart-btn"
                            onClick={() => setIsCartOpen(true)}
                            aria-label={`Cart with ${cartCount} items`}
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    </div>
                </div>

                <div className={`sidebar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <nav className="sidebar-nav">
                        <Link href="/" className={isActive('/') ? 'active' : ''}>
                            <Home size={20} /> Home
                        </Link>
                        <Link href="/shop" className={isActive('/shop') ? 'active' : ''}>
                            <ShoppingCart size={20} /> Shop
                        </Link>
                        <Link href="/collections" className={isActive('/collections') ? 'active' : ''}>
                            <Grid size={20} /> Collections
                        </Link>
                        <Link href="/about" className={isActive('/about') ? 'active' : ''}>
                            <Heart size={20} /> About
                        </Link>
                        <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>
                            <MessageCircle size={20} /> Contact
                        </Link>
                        <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>
                            <BookOpen size={20} /> Blog
                        </Link>
                        <div className="sidebar-divider"></div>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/shipping">Shipping</Link>
                        <Link href="/returns">Returns</Link>
                        <Link href="/size-guide">Size Guide</Link>
                        <Link href="/terms">Terms</Link>
                        <Link href="/privacy">Privacy</Link>
                    </nav>
                </div>

                {isMobileMenuOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                )}
            </header>

            <nav className="bottom-nav">
                <Link href="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
                    <Home size={24} />
                    <span>Home</span>
                </Link>
                <Link href="/shop" className={`bottom-nav-item ${isActive('/shop') ? 'active' : ''}`}>
                    <ShoppingCart size={24} />
                    <span>Shop</span>
                </Link>
                <Link href="/collections" className={`bottom-nav-item ${isActive('/collections') ? 'active' : ''}`}>
                    <Heart size={24} />
                    <span>Featured</span>
                </Link>
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="bottom-nav-item"
                >
                    <Search size={24} />
                    <span>Search</span>
                </button>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className={`bottom-nav-item ${cartCount > 0 ? 'has-items' : ''}`}
                >
                    <div className="bottom-nav-icon-wrapper">
                        <ShoppingBag size={24} />
                        {cartCount > 0 && <span className="bottom-nav-badge">{cartCount}</span>}
                    </div>
                    <span>Cart</span>
                </button>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;
