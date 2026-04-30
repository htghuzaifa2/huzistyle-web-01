'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert('Thank you for subscribing to Huzi Style!');
            setEmail('');
        }
    };

    return (
        <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-col brand-col">
                        <Link href="/" className="footer-logo" aria-label="Huzi Style — Home">Huzi Style</Link>
                        <p className="footer-desc">
                            Born in Pakistan. Designed for the World. Huzi Style bridges streetwear culture 
                            and high-fashion precision — shipped to 100+ countries.
                        </p>
                        <div className="social-links" aria-label="Follow us on social media">
                            <a href="https://www.instagram.com/huzistyle" target="_blank" rel="noopener noreferrer" aria-label="Huzi Style on Instagram">
                                <Instagram size={18} aria-hidden="true" />
                            </a>
                            <a href="https://twitter.com/huzistyle" target="_blank" rel="noopener noreferrer" aria-label="Huzi Style on Twitter">
                                <Twitter size={18} aria-hidden="true" />
                            </a>
                            <a href="mailto:hello@huzistyle.com" aria-label="Email Huzi Style">
                                <Mail size={18} aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="footer-col">
                        <h3 className="footer-heading">Shop</h3>
                        <ul className="footer-links">
                            <li><Link href="/shop">All Products</Link></li>
                            <li><Link href="/shop?sort=newest">New Arrivals</Link></li>
                            <li><Link href="/shop?category=Men">Men</Link></li>
                            <li><Link href="/shop?category=Women">Women</Link></li>
                            <li><Link href="/collections">Collections</Link></li>
                            <li><Link href="/lookbook">Lookbook</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="footer-col">
                        <h3 className="footer-heading">Support</h3>
                        <ul className="footer-links">
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/shipping">Shipping Info</Link></li>
                            <li><Link href="/returns">Returns & Exchanges</Link></li>
                            <li><Link href="/size-guide">Size Guide</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/about">About</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-col">
                        <h3 className="footer-heading">Newsletter</h3>
                        <p className="newsletter-text">New drops, exclusive offers, and style notes — directly to you.</p>
                        <form className="newsletter-form" onSubmit={handleSubscribe} aria-label="Newsletter signup">
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-label="Email address for newsletter"
                                    autoComplete="email"
                                />
                                <button type="submit" aria-label="Subscribe to newsletter">
                                    <ArrowRight size={16} aria-hidden="true" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} Huzi Style. All rights reserved.</p>
                        <div className="footer-legal">
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
