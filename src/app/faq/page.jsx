import { seoConfig } from '../../config/seoConfig';
import FAQClient from '../../components/FAQClient';

export const metadata = {
    title: seoConfig.faq.title,
    description: seoConfig.faq.description,
    keywords: seoConfig.faq.keywords,
    openGraph: {
        title: seoConfig.faq.title,
        description: seoConfig.faq.description,
        url: seoConfig.faq.canonicalUrl,
        images: [
            {
                url: seoConfig.faq.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.faq.canonicalUrl,
    },
};

export default function FAQPage() {
    return <FAQClient />;
}
