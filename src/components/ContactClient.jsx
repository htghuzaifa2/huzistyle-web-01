'use client';

import React, { useState } from 'react';

const ContactClient = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `*New Contact Message from huzistyle.com*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/message/BY3URMYOW3OMH1?text=${encodedText}`, '_blank'); // Adjusted to include text if supported, or just open the link
    };

    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">Contact Us</h1>
                <p className="page-subtitle">We're here to help and answer any question you might have.</p>
            </div>

            <div className="content-grid-layout">
                <div className="contact-info-col">
                    <div className="content-card mb-6">
                        <h2>Get in Touch</h2>
                        <p>At Huzi Style, we value our customers and are always here to help. Whether you have a question about our products, need assistance with an order, or simply want to connect, our support team is ready to assist you.</p>
                    </div>

                    <div className="contact-methods">
                        <div className="contact-card">
                            <h3 className="h4">Email Support</h3>
                            <a href="mailto:huzistyle.com@gmail.com" className="text-primary font-bold" style={{ textDecoration: 'none', display: 'block' }}>huzistyle.com@gmail.com</a>
                            <p className="text-subtle text-sm">Response within 24 hours.</p>
                        </div>
                        <div className="contact-card">
                            <h3 className="h4">WhatsApp</h3>
                            <a
                                href="https://wa.me/message/BY3URMYOW3OMH1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                Chat on WhatsApp
                            </a>
                            <p className="text-subtle text-sm" style={{ marginTop: '12px' }}>Quick assistance</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section">
                    <h2 className="h3 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group mb-4">
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={(e) => {
                                    if (!e.target.value.toLowerCase().includes('israel')) {
                                        setFormData({ ...formData, name: e.target.value });
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="Your email address"
                                value={formData.email}
                                onChange={(e) => {
                                    if (!e.target.value.toLowerCase().includes('israel')) {
                                        setFormData({ ...formData, email: e.target.value });
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group mb-6">
                            <label>Your Message</label>
                            <textarea
                                rows="6"
                                required
                                placeholder="Type your message here..."
                                value={formData.message}
                                onChange={(e) => {
                                    if (!e.target.value.toLowerCase().includes('israel')) {
                                        setFormData({ ...formData, message: e.target.value });
                                    }
                                }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">Send Message via WhatsApp</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactClient;
