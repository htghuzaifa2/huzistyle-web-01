import React from 'react';
import CompareClient from './CompareClient';
import { seoConfig } from '../../config/seoConfig';

export const metadata = {
    title: seoConfig.compare.title,
    description: seoConfig.compare.description,
    keywords: seoConfig.compare.keywords,
    alternates: {
        canonical: seoConfig.compare.canonicalUrl,
    },
    openGraph: {
        title: seoConfig.compare.title,
        description: seoConfig.compare.description,
        url: seoConfig.compare.canonicalUrl,
        images: [
            {
                url: seoConfig.compare.ogImage,
                width: 1200,
                height: 630,
                alt: seoConfig.compare.title,
            }
        ],
        type: 'website',
        siteName: 'Huzi Style',
    },
};

export default function ComparePage() {
    return <CompareClient />;
}
