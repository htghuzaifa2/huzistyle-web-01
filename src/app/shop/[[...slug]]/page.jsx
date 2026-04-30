import { Suspense } from 'react';
import { seoConfig } from '../../../config/seoConfig';
import ShopClient from '../../../components/ShopClient';
import { categories, gamingSubCategories } from '../../../data/products';

// Required for static export - pre-generate all shop routes
export async function generateStaticParams() {
    const params = [];

    // Base /shop route
    params.push({ slug: [] });

    // Category routes
    categories.forEach(cat => {
        const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
        params.push({ slug: [catSlug] });
    });

    // Product type routes (hoodies, jackets, etc.)
    params.push({ slug: ['hoodies'] });
    params.push({ slug: ['jackets'] });

    // Gaming subcategory routes
    gamingSubCategories.forEach(sub => {
        const subSlug = sub.toLowerCase().replace(/\s+/g, '-');
        params.push({ slug: ['gaming-outfits', subSlug] });
    });

    return params;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = slug?.[0];
    const subCategory = slug?.[1];

    let title = seoConfig.shop?.title || "Shop Premium Streetwear - Huzi Style";
    let description = seoConfig.shop?.description || "Browse our latest collections.";
    let keywords = seoConfig.shop?.keywords || "";

    const formatName = (str) => {
        if (!str) return '';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const formattedCategory = formatName(category);
    const formattedSubCategory = formatName(subCategory);

    if (category) {
        if (formattedCategory === 'All') {
            title = seoConfig.shop?.title || title;
            description = seoConfig.shop?.description || description;
        } else {
            title = `${formattedCategory} - Huzi Style`;
            description = `Shop premium ${formattedCategory.toLowerCase()} at Huzi Style. Custom sizing and fast international delivery.`;
        }
    }

    if (subCategory) {
        title = `${formattedSubCategory} ${formattedCategory} - Huzi Style`;
        description = `Exclusive ${formattedSubCategory} ${formattedCategory.toLowerCase()} with custom sizing. Shop authentic designs with global shipping.`;
    }

    if (category || subCategory) {
        keywords = `${formattedCategory.toLowerCase()}, ${subCategory ? formattedSubCategory.toLowerCase() + ',' : ''} streetwear Pakistan, custom fashion`;
    }

    let canonicalPath = '/shop';
    if (category) canonicalPath += `/${category}`;
    if (subCategory) canonicalPath += `/${subCategory}`;

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title,
            description,
            url: canonicalPath,
            images: [
                {
                    url: seoConfig.shop?.ogImage || '/favicon.ico', // Fallback
                }
            ],
            type: 'website',
            siteName: 'Huzi Style',
        }
    };
}

import { products } from '../../../data/products';

export default async function ShopPage({ params }) {
    const { slug } = await params;
    const category = slug?.[0];
    const subCategory = slug?.[1];

    // Server-side filtering for crawlability
    const formatSlug = (s) => s?.toLowerCase().replace(/\s+/g, '-');

    const filtered = (products || []).filter(product => {
        if (!category || category === 'all') return true;

        const productCategory = product.category ? formatSlug(product.category) : '';
        const productCategories = product.categories ? product.categories.map(c => formatSlug(c)) : [];

        const categoryMatches = productCategory === category || productCategories.includes(category);

        if (!categoryMatches) return false;
        if (!subCategory) return true;

        const productSubCategory = product.subCategory ? formatSlug(product.subCategory) : '';
        return productSubCategory === subCategory;
    });

    // Pass limited set (first batch) for initial HTML render
    const initialProducts = filtered.slice(0, 24).map(p => ({
        ...p,
        uniqueKey: `initial-${p.id}`
    }));

    return (
        <Suspense fallback={<div style={{padding:'80px 0',textAlign:'center',color:'var(--color-text-light)'}}>Loading shop&hellip;</div>}>
            <ShopClient
                categoryParam={category}
                subCategoryParam={subCategory}
                initialProducts={initialProducts}
            />
        </Suspense>
    );
}
