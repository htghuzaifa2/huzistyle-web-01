import { products, categories, gamingSubCategories } from '../data/products';

export const dynamic = 'force-static';

const URL = 'https://huzistyle.com';

export default function sitemap() {
    // 1. Static Routes
    const routes = [
        '',
        '/shop',
        '/collections',
        '/lookbook',
        '/about',
        '/contact',
        '/faq',
        '/shipping',
        '/returns',
        '/cod',
        '/terms',
        '/privacy',
    ].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Product Routes
    const productRoutes = products.map((product) => ({
        url: `${URL}/product/${product.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // 3. Category Routes
    const categoryRoutes = categories.map((cat) => ({
        url: `${URL}/shop/${cat.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // 4. Gaming SubCategory Routes
    const gamingRoutes = gamingSubCategories.map((sub) => ({
        url: `${URL}/shop/gaming-outfits/${sub.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [...routes, ...productRoutes, ...categoryRoutes, ...gamingRoutes];
}
