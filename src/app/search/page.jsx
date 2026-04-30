import { Suspense } from 'react';
import { seoConfig } from '../../config/seoConfig';
import SearchClient from '../../components/SearchClient';

export const metadata = {
    title: seoConfig.search.title,
    description: seoConfig.search.description,
    keywords: seoConfig.search.keywords,
    openGraph: {
        title: seoConfig.search.title,
        description: seoConfig.search.description,
        url: seoConfig.search.canonicalUrl,
        images: [
            {
                url: seoConfig.search.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.search.canonicalUrl,
    },
};

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchClient />
        </Suspense>
    );
}
