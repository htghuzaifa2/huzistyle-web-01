import { seoConfig } from '../../config/seoConfig';

export const metadata = {
    title: seoConfig.returns.title,
    description: seoConfig.returns.description,
    keywords: seoConfig.returns.keywords,
    openGraph: {
        title: seoConfig.returns.title,
        description: seoConfig.returns.description,
        url: seoConfig.returns.canonicalUrl,
        images: [
            {
                url: seoConfig.returns.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.returns.canonicalUrl,
    },
};

export default function ReturnsPage() {
    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">Returns & Refunds</h1>
                <p className="page-subtitle">Hassle-free returns within 3 days of delivery.</p>
            </div>

            <div className="content-grid-layout">
                <div className="content-card">
                    <h2>✅ Eligible for Return</h2>
                    <ul className="bullet-list">
                        <li>Item damaged during delivery</li>
                        <li>Wrong size or color received</li>
                        <li>Manufacturing defect or stitching issues</li>
                        <li>Incorrect item received</li>
                        <li>Item not matching product description</li>
                    </ul>
                </div>

                <div className="content-card">
                    <h2>❌ Not Eligible</h2>
                    <ul className="bullet-list">
                        <li>Change of mind after delivery</li>
                        <li>Item worn, washed, or altered</li>
                        <li>Tags or labels removed</li>
                        <li>Return request made after 3 days</li>
                        <li>Custom or personalized items</li>
                    </ul>
                </div>
            </div>

            <div className="content-section mt-12">
                <h2>How to Initiate a Return</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Contact Support</h3>
                        <p>Reach out via WhatsApp or email with your order number within 3 days of delivery.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Provide Proof</h3>
                        <p>Send clear photos or video showing the issue with the item.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Verification</h3>
                        <p>Our team will verify the issue and approve the return if eligible.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">4</div>
                        <h3>Return & Refund</h3>
                        <p>Send the item back in original condition. Refund processed upon receipt.</p>
                    </div>
                </div>
            </div>

            <div className="content-card mt-8">
                <h2>Exchange Policy</h2>
                <p>If you received the wrong size or color, we offer free exchanges (subject to stock availability). Simply follow the return process above and specify your preferred size/color.</p>
            </div>

            <div className="content-card mt-8">
                <h2>Refund Process</h2>
                <p>Once we receive and verify your returned item, your refund will be processed within 5-7 business days via your original payment method. Bank transfer refunds may take additional time depending on your bank.</p>
            </div>
        </div>
    );
}
