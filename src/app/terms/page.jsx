import { seoConfig } from '../../config/seoConfig';

export const metadata = {
    title: seoConfig.terms.title,
    description: seoConfig.terms.description,
    keywords: seoConfig.terms.keywords,
    openGraph: {
        title: seoConfig.terms.title,
        description: seoConfig.terms.description,
        url: seoConfig.terms.canonicalUrl,
        images: [
            {
                url: seoConfig.terms.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.terms.canonicalUrl,
    },
};

export default function TermsPage() {
    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">Terms of Service</h1>
                <p className="page-subtitle">Simple terms for a simple shopping experience.</p>
            </div>

            <div className="content-grid-layout">
                <div className="content-card">
                    <h2>1. Introduction</h2>
                    <p>Welcome to Huzi Style! By browsing our website and placing orders via WhatsApp, you agree to these Terms of Service. If you don't agree, please don't use our website.</p>
                    <p><strong>Note:</strong> Huzi Style is a client-side website. We don't require account creation or store your personal data on our servers.</p>
                </div>

                <div className="content-card">
                    <h2>2. How It Works</h2>
                    <p>Our website is designed to be simple and fast:</p>
                    <ul className="bullet-list">
                        <li>Browse products without creating an account</li>
                        <li>Add items to your cart (stored in your browser only)</li>
                        <li>Checkout via WhatsApp to confirm your order</li>
                        <li>We process and ship your order</li>
                    </ul>
                </div>

                <div className="content-card">
                    <h2>3. Products & Pricing</h2>
                    <p>We strive for accuracy in all product descriptions, images, and prices. However, mistakes can happen. We reserve the right to:</p>
                    <ul className="bullet-list">
                        <li>Correct pricing or product errors</li>
                        <li>Update product information without notice</li>
                        <li>Refuse or cancel orders if pricing errors occur</li>
                    </ul>
                </div>

                <div className="content-card">
                    <h2>4. Orders via WhatsApp</h2>
                    <p>When you checkout, you'll be redirected to WhatsApp to complete your order. By sending us your order details, you agree to purchase the items listed.</p>
                    <p>We reserve the right to accept or decline any order for any reason (stock availability, pricing errors, etc.).</p>
                </div>

                <div className="content-card">
                    <h2>5. Payment Methods</h2>
                    <p>We accept:</p>
                    <ul className="bullet-list">
                        <li><strong>Cash on Delivery (COD)</strong> - Pay when you receive (PKR 50 fee)</li>
                        <li><strong>Advance Payment</strong> - Bank transfer, JazzCash, or EasyPaisa</li>
                    </ul>
                    <p>Payment confirmation must be sent via WhatsApp for advance payment orders.</p>
                </div>

                <div className="content-card">
                    <h2>6. Shipping & Delivery</h2>
                    <p>We ship across Pakistan. Delivery times are estimates (5-10 business days depending on location) and subject to courier availability.</p>
                    <p>Free shipping on orders above PKR 2,500. Standard shipping is PKR 200.</p>
                </div>

                <div className="content-card">
                    <h2>7. Returns & Exchanges</h2>
                    <p>We offer returns and exchanges within 3 days of delivery for:</p>
                    <ul className="bullet-list">
                        <li>Wrong size/color/item received</li>
                        <li>Damaged or defective products</li>
                        <li>Manufacturing defects</li>
                    </ul>
                    <p>Items must be unworn, unwashed, with original tags. See our <a href="/returns">Returns Policy</a> for full details.</p>
                </div>

                <div className="content-card">
                    <h2>8. No Account Required</h2>
                    <p>Huzi Style doesn't require account creation. You can shop freely without sign-ups, passwords, or email verification.</p>
                    <p>Your cart data is stored locally in your browser and is not accessible to us.</p>
                </div>

                <div className="content-card">
                    <h2>9. Intellectual Property</h2>
                    <p>All content on this website (images, text, logos, designs) is property of Huzi Style. You may not reproduce, distribute, or use our content without permission.</p>
                </div>

                <div className="content-card">
                    <h2>10. Limitation of Liability</h2>
                    <p>Huzi Style is not liable for any indirect, incidental, or consequential damages arising from your use of our website or products.</p>
                </div>

                <div className="content-card">
                    <h2>11. Changes to Terms</h2>
                    <p>We may update these Terms of Service at any time. Continued use of our website after changes constitutes acceptance of the new terms.</p>
                </div>

                <div className="content-card">
                    <h2>12. Contact Us</h2>
                    <p>Questions about these Terms? Contact us:</p>
                    <ul className="bullet-list">
                        <li>Email: <a href="mailto:contact@huzistyle.com">contact@huzistyle.com</a></li>
                        <li>WhatsApp: <a href="https://wa.me/message/BY3URMYOW3OMH1" target="_blank" rel="noopener noreferrer">Click to Chat</a></li>
                    </ul>
                </div>
            </div>

            <div className="content-section mt-8">
                <p className="text-center text-subtle"><strong>Last Updated:</strong> December 2024</p>
            </div>
        </div>
    );
}
