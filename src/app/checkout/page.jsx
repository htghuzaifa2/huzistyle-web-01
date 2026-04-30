import { seoConfig } from '../../config/seoConfig';
import CheckoutClient from '../../components/CheckoutClient';

export const metadata = {
    title: seoConfig.checkout.title,
    description: seoConfig.checkout.description,
    keywords: seoConfig.checkout.keywords,
    openGraph: {
        title: seoConfig.checkout.title,
        description: seoConfig.checkout.description,
        url: seoConfig.checkout.canonicalUrl,
        images: [
            {
                url: seoConfig.checkout.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.checkout.canonicalUrl,
    },
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}
