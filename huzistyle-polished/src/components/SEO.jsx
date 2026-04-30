import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Huzi Style",
    description = "Explore the Huzi Style portfolio — Pakistan's premier atelier for luxury streetwear and bespoke craftsmanship. Global shipping on elite fashion.",
    keywords = "Huzi Style, luxury streetwear, bespoke tailoring, premium fashion, designer apparel, international shipping, couture streetwear",
    ogImage = "/og-image.jpg",
    ogType = "website",
    canonicalUrl
}) => {
    const siteUrl = "https://huzistyle.com"; // Update with your actual domain
    const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />
            <meta property="og:site_name" content="Huzi Style" />
            <meta property="og:locale" content="en_PK" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={fullUrl} />}

            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="Huzi Style" />
        </Helmet>
    );
};

export default SEO;
