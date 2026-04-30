'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, Home, ShoppingBag, Grid3x3, BookOpen, Heart, MessageCircle, Phone, Truck, RotateCcw, Scale, HelpCircle, FileText, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './AssistiveTouch.css';

const QuickLinksData = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Shop', path: '/shop', icon: ShoppingBag },
    { label: 'Collections', path: '/collections', icon: Grid3x3 },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'About', path: '/about', icon: Heart },
    { label: 'Contact', path: '/contact', icon: MessageCircle },
    { label: 'Compare', path: '/compare', icon: Scale },
    { label: 'FAQ', path: '/faq', icon: HelpCircle },
    { label: 'Shipping', path: '/shipping', icon: Truck },
    { label: 'Returns', path: '/returns', icon: RotateCcw },
    { label: 'COD', path: '/cod', icon: Phone },
    { label: 'Size Guide', path: '/size-guide', icon: FileText },
];

const AssistiveTouch = () => {
    const pathname = usePathname();
    const { isCartOpen } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const panelRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                panelRef.current &&
                !panelRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    // Prevent body scroll when open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    if (!isClient || isCartOpen) return null;

    return (
        <>
            {/* Slide-up Panel */}
            <div
                ref={panelRef}
                className={`quicklinks-panel ${isOpen ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="quicklinks-header">
                    <span className="quicklinks-title">Quick Links</span>
                    <button
                        className="quicklinks-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="quicklinks-grid">
                    {QuickLinksData.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`quicklinks-item ${isActive ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={18} strokeWidth={1.8} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className="quicklinks-footer">
                    <Link href="/privacy" className="quicklinks-footer-link" onClick={() => setIsOpen(false)}>
                        <Shield size={14} />
                        <span>Privacy</span>
                    </Link>
                    <span className="quicklinks-footer-dot">|</span>
                    <Link href="/terms" className="quicklinks-footer-link" onClick={() => setIsOpen(false)}>
                        <FileText size={14} />
                        <span>Terms</span>
                    </Link>
                </div>
            </div>

            {/* Overlay backdrop */}
            <div
                className={`quicklinks-backdrop ${isOpen ? 'visible' : ''}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Floating Button - bottom right */}
            <button
                ref={buttonRef}
                className="quicklinks-btn"
                onClick={toggleMenu}
                aria-label="Open quick links"
                aria-expanded={isOpen}
            >
                <span className="quicklinks-btn-icon">H</span>
            </button>
        </>
    );
};

export default AssistiveTouch;
