import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on Mount
    useEffect(() => {
        const savedCart = localStorage.getItem('huzi_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage on Change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('huzi_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product, quantity, color, size) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item =>
                item.id === product.id && item.color === color && item.size === size
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity, color, size }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId, color, size) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.color === color && item.size === size)));
    };

    const updateQuantity = (itemId, color, size, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            (item.id === itemId && item.color === color && item.size === size)
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            getCartCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
