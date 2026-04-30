'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import './AssistiveTouch.css';

const AssistiveTouch = () => {
    const pathname = usePathname();
    const { isCartOpen } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0 });

    const idleTimer = useRef(null);
    const isDragging = useRef(false);
    const ballRef = useRef(null);
    // Persist position state using motion values for smoothness
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load position from storage on mount
        const saved = localStorage.getItem('huzi_assistive_pos');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                x.set(parsed.x);
                y.set(parsed.y);
            } catch (e) {
                console.error('Failed to parse assistive position', e);
            }
        }
        setIsLoaded(true);
    }, [x, y]);

    const savePosition = () => {
        const currentX = x.get();
        const currentY = y.get();
        localStorage.setItem('huzi_assistive_pos', JSON.stringify({ x: currentX, y: currentY }));
    };

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Collections', path: '/collections' },
        { label: 'Lookbook', path: '/lookbook' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Compare', path: '/compare' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Shipping', path: '/shipping' },
        { label: 'Returns', path: '/returns' },
        { label: 'COD', path: '/cod' },
        { label: 'Terms', path: '/terms' },
        { label: 'Privacy', path: '/privacy' },
    ];

    const ITEM_COUNT = menuItems.length;

    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (!isOpen) {
            idleTimer.current = setTimeout(() => setIsIdle(true), 4000);
        }
    };

    // Tight radius — compact menu
    const getRadius = (w) => {
        if (w < 480) return 95;
        if (w < 768) return 115;
        return 135;
    };

    useEffect(() => {
        setIsClient(true);
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        resetIdleTimer();

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    const getItemPosition = (index) => {
        const radius = getRadius(windowSize.width);
        const startAngle = -90;
        const angleStep = 360 / ITEM_COUNT;
        const angleDeg = startAngle + (index * angleStep);
        const angleRad = (angleDeg * Math.PI) / 180;
        return {
            x: Math.cos(angleRad) * radius,
            y: Math.sin(angleRad) * radius,
        };
    };

    const getBallCenter = () => {
        if (ballRef.current) {
            const rect = ballRef.current.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };
        }
        return {
            x: windowSize.width - 40,
            y: windowSize.height - 50,
        };
    };

    const handleBallClick = () => {
        if (!isDragging.current) {
            // Open in center of screen
            setMenuOrigin({
                x: windowSize.width / 2,
                y: windowSize.height / 2
            });
            setIsOpen(true);
            resetIdleTimer();
        }
        isDragging.current = false;
    };

    if (!isClient || !isLoaded) return null;
    if (isCartOpen) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="assistive-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            className="radial-center"
                            style={{
                                left: menuOrigin.x,
                                top: menuOrigin.y,
                            }}
                        >
                            {/* Close Button */}
                            <motion.button
                                className="radial-close-btn"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                            >
                                <X size={18} color="white" strokeWidth={2.5} />
                            </motion.button>

                            {/* Pill Items — fast stagger */}
                            {menuItems.map((item, index) => {
                                const pos = getItemPosition(index);
                                return (
                                    <motion.div
                                        key={item.label}
                                        className="radial-pill-wrapper"
                                        initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
                                        exit={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            ease: [0.23, 1, 0.32, 1],
                                            delay: index * 0.015,
                                        }}
                                    >
                                        <Link
                                            href={item.path}
                                            className="radial-pill"
                                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating H Ball */}
            {!isOpen && (
                <motion.div
                    ref={ballRef}
                    drag
                    dragMomentum={true}
                    dragElastic={0.2}
                    onDragEnd={() => {
                        resetIdleTimer();
                        savePosition();
                    }}
                    onPointerUp={(e) => {
                        // Differentiate click from drag
                        if (!isDragging.current) handleBallClick();
                        isDragging.current = false;
                    }}
                    onDragStart={() => { isDragging.current = true; resetIdleTimer(); }}
                    dragConstraints={{
                        left: -windowSize.width + 48 + 10, // Width - Ball - Padding
                        right: 0, // Anchored Right
                        top: -(windowSize.height - (windowSize.width <= 1024 ? 100 : 30) - 48 - 20), // Height - Bottom - Ball - Padding
                        bottom: 0, // Anchored Bottom
                    }}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                    onLayoutAnimationComplete={() => {
                        // Ensure we save if it settles
                        savePosition();
                    }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255, 255, 255, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="assistive-ball"
                    style={{
                        x, y,
                        position: 'fixed',
                        bottom: windowSize.width <= 1024 ? 100 : 30,
                        right: 20,
                        zIndex: 10001,
                        cursor: 'grab',
                        touchAction: 'none',
                        opacity: isIdle ? 0.5 : 1,
                    }}
                >
                    <div className="assistive-ball-icon">
                        <span className="logo-text">H</span>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default AssistiveTouch;
