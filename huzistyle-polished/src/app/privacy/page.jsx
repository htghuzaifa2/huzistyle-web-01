import { seoConfig } from '../../config/seoConfig';

export const metadata = {
    title: seoConfig.privacy.title,
    description: seoConfig.privacy.description,
    keywords: seoConfig.privacy.keywords,
    openGraph: {
        title: seoConfig.privacy.title,
        description: seoConfig.privacy.description,
        url: seoConfig.privacy.canonicalUrl,
        images: [
            {
                url: seoConfig.privacy.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.privacy.canonicalUrl,
    },
};

export default function PrivacyPage() {
    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">Privacy Policy</h1>
                <p className="page-subtitle">Your privacy matters. We don't collect or store your data.</p>
            </div>

            <div className="content-grid-layout">
                <div className="content-card">
                    <h2>🔒 No Data Collection</h2>
                    <p><strong>Huzi Style is a client-side website.</strong> We do not collect, store, or process any personal information on our servers. Your browsing experience is completely private.</p>
                    <p>All product browsing, cart management, and theme preferences are stored only in your browser's local storage and never leave your device.</p>
                </div>

                <div className="content-card">
                    <h2>📱 WhatsApp Checkout</h2>
                    <p>When you place an order, you are redirected to WhatsApp to complete your purchase. Your order details are sent directly to us via WhatsApp.</p>
                    <p>We only receive the information you choose to share with us through WhatsApp (your name, phone number, address, and order details).</p>
                </div>

                <div className="content-card">
                    <h2>🚫 No Account Required</h2>
                    <p>Huzi Style does not require account creation. You can browse, add items to cart, and checkout without creating an account or providing any personal information upfront.</p>
                    <p>This means: no passwords to remember, no email verification, no sign-up forms.</p>
                </div>

                <div className="content-card">
                    <h2>🍪 Cookies & Local Storage</h2>
                    <p>We use browser local storage (not cookies) to remember your cart items and theme preference. This data stays on your device and is never sent to our servers.</p>
                    <p>You can clear this data anytime by clearing your browser's local storage.</p>
                </div>

                <div className="content-card">
                    <h2>🔐 Third-Party Services</h2>
                    <p>When you contact us via WhatsApp, you are using WhatsApp's services, which are governed by <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp's Privacy Policy</a>.</p>
                    <p>We have no control over the data WhatsApp collects as part of their messaging service.</p>
                </div>

                <div className="content-card">
                    <h2>📊 Analytics</h2>
                    <p>We do not use any analytics or tracking services. Your browsing behavior on Huzi Style is completely private and not monitored.</p>
                </div>

                <div className="content-card">
                    <h2>✉️ Contact Information</h2>
                    <p>When you contact us via email (<a href="mailto:contact@huzistyle.com">contact@huzistyle.com</a>) or WhatsApp, we only use the information you provide to respond to your inquiry and process your orders.</p>
                    <p>We do not share your contact information with third parties for marketing purposes.</p>
                </div>

                <div className="content-card">
                    <h2>🔄 Changes to This Policy</h2>
                    <p>If we make changes to this Privacy Policy, we will update this page. Since we don't collect your email, we cannot notify you directly of changes.</p>
                </div>

                <div className="content-card">
                    <h2>📞 Questions?</h2>
                    <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:contact@huzistyle.com">contact@huzistyle.com</a> or via <a href="https://wa.me/message/BY3URMYOW3OMH1" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
                </div>
            </div>

            <div className="content-section mt-8">
                <p className="text-center text-subtle"><strong>Last Updated:</strong> December 2024</p>
                <p className="text-center"><strong>In Simple Terms:</strong> Huzi Style is a simple, fast, client-side website. We don't collect your data. No accounts. No tracking. Just pure shopping through WhatsApp.</p>
            </div>
        </div>
    );
}
