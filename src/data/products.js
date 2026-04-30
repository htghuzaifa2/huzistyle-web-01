// Product Data
// Do not remove the exports below, as they are used by the application components.

export const categories = ['Men', 'Women', 'Kids', 'Couple', 'Gaming Outfits', 'Ghost of Yotei'];

export const gamingSubCategories = [
    'Ghost of Tsushima',
    'God of War',
    'The Last of Us',
    'Elden Ring',
    'Assassin\'s Creed',
    'Ghost of Yotei'
];

export const productTypes = ['Hoodie', 'Jacket', 'Shirt', 'Pants', 'Accessories'];

import rawProducts from './products.json';

// Helper to normalize strings for comparison
const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

export const products = rawProducts.map(p => {
    // 1. Determine Category & SubCategory
    let category = 'Men'; // Default
    let subCategory = null;

    // Check for Gaming SubCategories first
    const gamingMatch = gamingSubCategories.find(g =>
        p.categories.some(c => normalize(c) === normalize(g))
    );

    if (gamingMatch) {
        category = 'Gaming Outfits';
        subCategory = gamingMatch;
    } else {
        // Check for main categories
        if (p.categories.some(c => normalize(c) === 'women')) category = 'Women';
        else if (p.categories.some(c => normalize(c) === 'kids')) category = 'Kids';
        else if (p.categories.some(c => normalize(c) === 'men')) category = 'Men';
    }

    // 2. Determine Product Type
    let productType = 'Accessories';
    const typeMatch = productTypes.find(t =>
        p.categories.some(c => normalize(c).includes(normalize(t)))
    );
    if (typeMatch) productType = typeMatch;

    // 3. Determine secondary categories (Unisex / Gaming products appear in Men + Women + Kids + Couple)
    let secondaryCategories = [];
    if (category === 'Gaming Outfits' || p.categories.some(c => normalize(c) === 'unisex')) {
        secondaryCategories = ['Men', 'Women', 'Kids', 'Couple'];
    } else if (category !== 'Kids') {
        // Non-gaming products also available in Kids + Couple via custom sizing
        secondaryCategories = ['Kids', 'Couple'];
    }

    // 4. Map Fields
    return {
        id: p.id,
        slug: p.slug,
        name: p.title,
        price: p.price,
        category: category,
        subCategory: subCategory,
        secondaryCategories: secondaryCategories,
        productType: productType,
        image: p.images[0]?.url || '',
        images: p.images.map(img => img.url),
        description: p.shortDescription || (p.description ? p.description.substring(0, 150) + '...' : 'Premium streetwear by Huzi Style.'),
        longDescription: p.description,
        specifications: p.specs,
        stock: p.stock || 50,
        rating: 5, // Default rating
        meta: p.meta
    };
});
