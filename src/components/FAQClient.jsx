'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQClient = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: '👕 How do I place an order?',
            answer: 'Browse our clothing collection, select your size and favorite pieces, add them to your cart, and proceed to checkout. Choose Cash on Delivery or Advance Payment, then confirm your order via WhatsApp to finalize the details.'
        },
        {
            question: '📏 What if my size doesn\'t fit?',
            answer: 'We offer detailed size charts for each product. If you receive an item that doesn\'t fit properly, you can exchange it within 3 days of delivery for a different size (subject to availability).'
        },
        {
            question: '🚚 What are the shipping charges?',
            answer: 'We offer a flat standard delivery fee of $10 for all orders worldwide, regardless of order value.'
        },
        {
            question: '⏱️ How long does delivery take?',
            answer: 'Standard delivery takes 5-7 business days for major cities (Karachi, Lahore, Islamabad). Other areas may take 7-10 business days depending on location.'
        },
        {
            question: '🔄 Can I return or exchange a product?',
            answer: 'Yes! If you receive a damaged, defective, or incorrect item, you can return it within 3 days of delivery. Exchanges for size or color are also available within this period. Please check our Returns & Refunds policy for complete details.'
        },
        {
            question: '💰 What payment methods do you accept?',
            answer: 'We accept Cash on Delivery (COD) with a $2.00 fee, as well as Advance Payment via Bank Transfer with no additional charges.'
        },
        {
            question: '🔐 Is my personal information safe?',
            answer: 'Absolutely! Huzi Style is a client-side website - we don\'t collect or store any of your personal data on our servers. Your cart data stays in your browser. When you checkout via WhatsApp, only the information you choose to share is sent to us.'
        },
        {
            question: '🌍 Do you ship internationally?',
            answer: 'Yes! We ship globally. Shipping costs and delivery times vary by destination.'
        },
        {
            question: '📦 How can I track my order?',
            answer: 'Once your order is dispatched, we\'ll send you tracking details via WhatsApp and SMS. You can use this to monitor your delivery status.'
        },
        {
            question: '💬 How can I contact customer support?',
            answer: 'You can reach us via WhatsApp, email, or through our Contact Us page. We\'re here to help with any questions or concerns!'
        }
    ];

    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">FAQ</h1>
                <p className="page-subtitle">Common questions, answered.</p>
            </div>

            <div className="faq-accordion">
                {faqs.map((faq, index) => (
                    <div key={index} className={`faq-accordion-item ${openIndex === index ? 'active' : ''}`}>
                        <button
                            className="faq-accordion-header"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <h3>{faq.question}</h3>
                            <ChevronDown className={`faq-icon ${openIndex === index ? 'rotate' : ''}`} size={20} />
                        </button>
                        <div className={`faq-accordion-content ${openIndex === index ? 'open' : ''}`}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQClient;
