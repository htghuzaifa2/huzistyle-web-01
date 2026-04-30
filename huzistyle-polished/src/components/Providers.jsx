'use client';

import { CompareProvider } from '../context/CompareContext';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';


export default function Providers({ children }) {
    return (
        <ThemeProvider>
            <CompareProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </CompareProvider>
        </ThemeProvider>
    );
}
