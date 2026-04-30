import { seoConfig } from '../config/seoConfig';
import HomeClient from '../components/HomeClient';

export const metadata = {
    title: seoConfig.home.title,
    description: seoConfig.home.description,
    keywords: seoConfig.home.keywords,
    openGraph: {
        title: seoConfig.home.title,
        description: seoConfig.home.description,
        url: seoConfig.home.canonicalUrl,
        images: [
            {
                url: seoConfig.home.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.home.canonicalUrl,
    },
};

import { products } from '../data/products';

export default function HomePage() {
    // Pass the first batch to the client for SSR/Hydration
    // We use a stable key for initial items to avoid mismatch
    const initialProducts = (products || []).slice(0, 24).map(p => ({
        ...p,
        uniqueKey: `initial-${p.id}`
    }));

    return <HomeClient initialProducts={initialProducts} />;
}
