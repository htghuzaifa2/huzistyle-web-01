import '../index.css';
import '../App.css';
import '../styles/Home.css';
import '../styles/Shop.css';
import '../styles/Product.css';
import '../styles/Categories.css';
import '../styles/Checkout.css';
import '../styles/SearchResults.css';
import '../styles/ContentPage.css';
import '../styles/Account.css';
import '../styles/Blog.css';
import Providers from '../components/Providers';
import Layout from '../layouts/Layout';
import AssistiveTouch from '../components/AssistiveTouch';
import PrefetchLoader from '../components/PrefetchLoader';

export const metadata = {
    metadataBase: new URL('https://huzistyle.com'),
    title: {
        default: 'Huzi Style — Premium Streetwear Pakistan',
        template: '%s | Huzi Style',
    },
    description: 'Premium streetwear and luxury fashion in Pakistan. Shop hoodies, jackets, and custom apparel with international shipping to 100+ countries.',
    keywords: ['Huzi Style', 'Luxury Streetwear Pakistan', 'Premium Fashion', 'Designer Streetwear', 'Custom Hoodies Pakistan', 'Buy Streetwear Online', 'Pakistan Fashion Brand'],
    authors: [{ name: 'Huzi Style', url: 'https://huzistyle.com' }],
    creator: 'Huzi Style',
    publisher: 'Huzi Style',
    category: 'Fashion & Apparel',
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://huzistyle.com',
        siteName: 'Huzi Style',
        title: 'Huzi Style — Premium Streetwear Pakistan',
        description: "Pakistan's premium streetwear destination. Exclusive hoodies, tees, and accessories shipped worldwide.",
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Huzi Style Premium Fashion', type: 'image/jpeg' }],
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Huzi Style — Premium Streetwear Pakistan',
        description: 'Shop the latest streetwear and premium fashion in Pakistan. Worldwide shipping.',
        site: '@huzistyle',
        creator: '@huzistyle',
        images: ['/og-image.jpg'],
    },
    alternates: { canonical: 'https://huzistyle.com' },
};

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Huzi Style',
    url: 'https://huzistyle.com',
    logo: 'https://huzistyle.com/favicon.png',
    description: 'Premium streetwear and luxury fashion brand from Pakistan, shipping worldwide.',
    address: { '@type': 'PostalAddress', addressCountry: 'PK', addressRegion: 'Punjab', addressLocality: 'Lahore' },
    sameAs: ['https://www.instagram.com/huzistyle', 'https://www.facebook.com/huzistyle', 'https://twitter.com/huzistyle'],
    priceRange: '$$',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </head>
            <body suppressHydrationWarning={true}>
                <PrefetchLoader />
                <Providers>
                    <Layout>
                        {children}
                        <AssistiveTouch />
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
