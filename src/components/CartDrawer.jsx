'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        onClose();
        router.push('/checkout');
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2 className="h3">Shopping Cart</h2>
                    <button onClick={onClose} className="close-btn" aria-label="Close cart"><X size={24} /></button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart-msg-container">
                            <p className="empty-cart-msg">Your cart is empty.</p>
                            <button className="btn btn-outline mt-4" onClick={() => { onClose(); router.push('/shop'); }}>
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-info-top">
                                        <h4>{item.name}</h4>
                                        <button
                                            className="remove-btn-icon"
                                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                                            aria-label="Remove item"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>

                                    {(item.color || item.size) && (
                                        <p className="variant-text">
                                            {item.color}{item.color && item.size ? ' / ' : ''}{item.size}
                                        </p>
                                    )}

                                    <div className="cart-item-actions">
                                        <div className="qty-control">
                                            <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                <Minus size={14} />
                                            </button>
                                            <span className="qty-num">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="price-tag">$ {item.price * item.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="footer-summary">
                        <div className="cart-total subrow">
                            <span className="label">Subtotal</span>
                            <span className="value-sm">$ {getCartTotal()}</span>
                        </div>
                        <div className="cart-total subrow">
                            <span className="label">Shipping</span>
                            <span className="value-sm">$ 10</span>
                        </div>
                        <div className="cart-total main">
                            <span className="label">Total</span>
                            <span className="value">$ {getCartTotal() + 10}</span>
                        </div>
                        <p className="shipping-note-simple">Global Flat Rate Applied</p>
                    </div>

                    <button
                        className="btn btn-primary checkout-btn"
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                    >
                        Secure Checkout
                    </button>

                    <div className="secure-checkout-note">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        SSL Secure Payment
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
