import { seoConfig } from '../../config/seoConfig';

export const metadata = {
    title: seoConfig.about.title,
    description: seoConfig.about.description,
    keywords: seoConfig.about.keywords,
    openGraph: {
        title: seoConfig.about.title,
        description: seoConfig.about.description,
        url: seoConfig.about.canonicalUrl,
        images: [
            {
                url: seoConfig.about.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.about.canonicalUrl,
    },
};

export default function AboutPage() {
    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">Huzi Style</h1>
                <p className="page-subtitle">The Atelier of Elite Aesthetics</p>
            </div>

            <div className="content-section">
                <p className="lead-text">Welcome to <strong>Huzi Style</strong>, a global premium atelier dedicated to the art of bespoke craftsmanship. We bridge the gap between contemporary streetwear and high-fashion precision.</p>
            </div>

            <div className="content-grid-layout">
                <div className="content-card">
                    <h2>The Legacy</h2>
                    <p>Huzi Style represents a commitment to authenticity and the relentless pursuit of the perfect silhouette. We curate high-performance apparel for the discerning global citizen who values excellence in construction and design.</p>
                </div>

                <div className="content-card">
                    <h2>Our Vision</h2>
                    <p>To be the premier global destination for those seeking a curated wardrobe defined by superior silhouettes and timeless artisanal excellence.</p>
                </div>
            </div>

            <div className="content-section mt-12">
                <h2>Elite Standards</h2>
                <div className="content-grid-layout mt-8">
                    <div className="feature-item">
                        <h3>🔥 Elite Silhouettes</h3>
                        <p>Articulated designs that define modern luxury and personal distinction.</p>
                    </div>
                    <div className="feature-item">
                        <h3>✨ Artisanal Quality</h3>
                        <p>Superior fabrics and master-level craftsmanship that ensure longevity and prestige.</p>
                    </div>
                    <div className="feature-item">
                        <h3>🌍 Master Artisans</h3>
                        <p>Crafted with excellence, blending global design language with traditional tailoring mastery.</p>
                    </div>
                    <div className="feature-item">
                        <h3>🚀 Global Logistics</h3>
                        <p>High-security international shipping for our worldwide community of collectors.</p>
                    </div>
                </div>
            </div>

            <div className="content-section">
                <h2>Our Commitment</h2>
                <p>At Huzi Style, we are committed to delivering unmatched quality with a focus on artisanal mastery. Every item is a testament to our dedication to perfection.</p>
                <p className="mt-4 font-bold"><strong>Huzi Style — The Signature of Bespoke Luxury.</strong></p>
            </div>
        </div>
    );
}
