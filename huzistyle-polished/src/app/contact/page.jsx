import { seoConfig } from '../../config/seoConfig';
import ContactClient from '../../components/ContactClient';

export const metadata = {
    title: seoConfig.contact.title,
    description: seoConfig.contact.description,
    keywords: seoConfig.contact.keywords,
    openGraph: {
        title: seoConfig.contact.title,
        description: seoConfig.contact.description,
        url: seoConfig.contact.canonicalUrl,
        images: [
            {
                url: seoConfig.contact.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.contact.canonicalUrl,
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
