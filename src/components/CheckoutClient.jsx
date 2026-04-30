'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { countries as countryList } from '../data/countries';
import { Search, ChevronDown, Check, AlertCircle, ShoppingBag } from 'lucide-react';
// import '../styles/Checkout.css';

const CheckoutClient = () => {
    const { cart, getCartTotal } = useCart();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        province: '',
        country: 'Palestine',
        paymentMethod: 'advance' // only 'advance' now
    });

    const [countrySearch, setCountrySearch] = useState('');
    const [showFakeStateMsg, setShowFakeStateMsg] = useState(false);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const countryDropdownRef = useRef(null);

    // Filter out Israel just in case, and filter by search query
    const filteredCountries = useMemo(() => {
        return countryList
            .filter(c => c.toLowerCase() !== 'israel')
            .filter(c => c.toLowerCase().includes(countrySearch.toLowerCase()));
    }, [countrySearch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Block writing "israel" in any field (case insensitive)
        if (value.toLowerCase().includes('israel')) {
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (formData.name.trim().length < 1) errors.name = 'Full Name is required';
        if (formData.address.trim().length < 1) errors.address = 'Address is required';
        if (formData.city.trim().length < 1) errors.city = 'City is required';

        // Basic email validation: must have @
        if (!formData.email.includes('@')) {
            errors.email = 'Please enter a valid email address';
        }

        // Phone validation: 7+ digits
        const digitsOnly = formData.phone.replace(/\D/g, '');
        if (digitsOnly.length < 7) {
            errors.phone = 'Please enter at least 7 digits';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const subtotal = getCartTotal();
        const shippingFee = 10.00;
        const total = subtotal + shippingFee;

        // Construct WhatsApp Message
        let message = `*Order from huzistyle.com*\n\n`;
        message += `*ORDER SUMMARY*\n--------------------\n`;

        cart.forEach(item => {
            const variantInfo = (item.size || item.color) ? ` (${item.size || ''}/${item.color || ''})` : '';
            message += `[ID: ${item.id}] ${item.name}${variantInfo}\n`;
            message += `Qty: ${item.quantity} - Price: $ ${item.price}\n\n`;
        });

        message += `--------------------\n`;
        message += `Subtotal: $ ${subtotal}\n`;
        message += `Shipping: $ ${shippingFee}\n`;
        message += `*Total Amount: $ ${total}*\n`;
        message += `--------------------\n`;
        message += `*CUSTOMER DETAILS*\n`;
        message += `- Name: ${formData.name}\n`;
        message += `- Phone: ${formData.phone}\n`;
        message += `- Email: ${formData.email}\n`;
        message += `- Address: ${formData.address}, ${formData.city}, ${formData.province}\n`;
        message += `- Country: ${formData.country}\n`;
        message += `- Payment: Advance Payment\n`;

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        // Using the requested link format with pre-filled text
        window.open(`https://wa.me/message/BY3URMYOW3OMH1?text=${encodedMessage}`, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-page container empty-checkout-container">
                <div className="empty-checkout-content">
                    <div className="empty-icon-wrapper">
                        <ShoppingBag size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="h2">Your cart is empty</h1>
                    <p className="text-subtle mb-8">Looks like you haven't added anything to your cart yet. Explore our latest collections and find something you love!</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => router.push('/shop')}
                    >
                        Explore Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <h1 className="h2 checkout-title">Checkout</h1>

            <div className="checkout-grid">
                <div className="checkout-form-section">
                    <h2 className="h3 mb-4">Shipping Details</h2>
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                className={formErrors.name ? 'error' : ''}
                            />
                            {formErrors.name && <span className="error-text"><AlertCircle size={14} /> {formErrors.name}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+..."
                                    className={formErrors.phone ? 'error' : ''}
                                />
                                {formErrors.phone && <span className="error-text"><AlertCircle size={14} /> {formErrors.phone}</span>}
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                    className={formErrors.email ? 'error' : ''}
                                />
                                {formErrors.email && <span className="error-text"><AlertCircle size={14} /> {formErrors.email}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Street address, Apartment, etc."
                                className={formErrors.address ? 'error' : ''}
                            />
                            {formErrors.address && <span className="error-text"><AlertCircle size={14} /> {formErrors.address}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Your City"
                                    className={formErrors.city ? 'error' : ''}
                                />
                                {formErrors.city && <span className="error-text"><AlertCircle size={14} /> {formErrors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label>Province/State (Optional)</label>
                                <input
                                    type="text"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    placeholder="Province"
                                />
                            </div>
                        </div>

                        <div className="form-group country-select-container" ref={countryDropdownRef}>
                            <label>Country</label>
                            <div
                                className={`custom-select ${isCountryDropdownOpen ? 'open' : ''}`}
                                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            >
                                <div className="selected-value">
                                    {formData.country || 'Select Country'}
                                    <ChevronDown size={18} />
                                </div>
                                {isCountryDropdownOpen && (
                                    <div className="select-dropdown" onClick={(e) => e.stopPropagation()}>
                                        <div className="search-box">
                                            <Search size={16} />
                                            <input
                                                type="text"
                                                placeholder="Search country..."
                                                value={countrySearch}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val.toLowerCase().includes('israel')) {
                                                        setCountrySearch('');
                                                        setShowFakeStateMsg(true);
                                                        setTimeout(() => setShowFakeStateMsg(false), 4000);
                                                    } else {
                                                        setCountrySearch(val);
                                                        setShowFakeStateMsg(false);
                                                    }
                                                }}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="options-list">
                                            {showFakeStateMsg ? (
                                                <div className="no-options" style={{ color: '#e53e3e', fontWeight: '600', padding: '12px 16px', textAlign: 'center' }}>
                                                    We do not ship to Israel aka Fake State.
                                                    <br />
                                                    <span style={{ fontWeight: '400', fontSize: '12px' }}>We do not recognise it as a country.</span>
                                                </div>
                                            ) : filteredCountries.length > 0 ? (
                                                filteredCountries.map((country) => (
                                                    <div
                                                        key={country}
                                                        className={`option ${formData.country === country ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, country }));
                                                            setIsCountryDropdownOpen(false);
                                                            setCountrySearch('');
                                                        }}
                                                    >
                                                        {country}
                                                        {formData.country === country && <Check size={14} />}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="no-options">No countries found</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="payment-ready-notice">
                            <h2 className="h3 mb-4 mt-8">Payment Method</h2>
                            <div className="payment-option selected advance-only">
                                <div className="payment-details">
                                    <div className="payment-title">Advance Payment</div>
                                    <div className="payment-desc">Payoneer / Wise / Bank Transfer</div>
                                </div>
                            </div>
                            <p className="mt-2 text-subtle" style={{ fontSize: '13px' }}>
                                * All international orders are processed via secure advance payment methods.
                            </p>
                        </div>
                    </form>
                </div>

                <div className="checkout-summary-section">
                    <div className="order-summary-card">
                        <h3 className="h3 mb-4">Order Summary</h3>
                        <div className="summary-items">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="summary-item">
                                    <div className="summary-item-left">
                                        <img src={item.image} alt={item.name} className="summary-item-image" />
                                        <div className="summary-item-info">
                                            <span className="summary-item-name">{item.name}</span>
                                            <span className="summary-item-variant">{[item.color, item.size].filter(Boolean).join(' / ')} x {item.quantity}</span>
                                        </div>
                                    </div>
                                    <span className="summary-item-price">$ {item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>$ {getCartTotal()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Global Shipping</span>
                                <span>$ 10.00</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span>$ {getCartTotal() + 10.00}</span>
                            </div>
                        </div>

                        <button type="submit" form="checkout-form" className="btn btn-primary btn-full mt-6">
                            Place International Order
                        </button>

                        <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: 'var(--color-text-light)', lineHeight: '1.6' }}>
                            <strong style={{ color: 'var(--color-text)' }}>Shipping Policy:</strong> We ship to all countries worldwide except Israel aka Fake State. We do not recognise it as a country.<br />
                            <em style={{ color: '#b8860b', fontSize: '11px' }}>
                                "The Pakistani passport is valid for all countries of the world except Israel." — Quaid-e-Azam Muhammad Ali Jinnah's principled stance remains our guiding policy.
                            </em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutClient;
