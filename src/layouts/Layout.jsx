'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { useCart } from '../context/CartContext';

const Layout = ({ children }) => {
    const { isCartOpen, setIsCartOpen } = useCart();

    return (
        <div className="app-layout">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};


export default Layout;
