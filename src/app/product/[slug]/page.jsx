import { products } from '../../../data/products';
import ProductClient from '../../../components/ProductClient';

// Required for static export - pre-generate all product slugs
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found | Huzi Style",
            description: "The product you are looking for does not exist.",
        };
    }

    // Handle new schema vs old schema
    const title = product.title || product.name;
    const imageUrl = product.images && product.images.length > 0
        ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url)
        : product.image;

    const category = product.categories && product.categories.length > 0
        ? product.categories[0]
        : product.category || 'Apparel';

    // Simple, clean description under 160 chars
    const productDesc = (product.shortDescription || product.description || "").substring(0, 90).trim();
    const description = productDesc ? `${productDesc}. Shop at Huzi Style.` : `${title} - Premium ${category} at Huzi Style with custom sizing and fast shipping.`;
    const finalDescription = description.substring(0, 160);

    return {
        title: `${title} - Huzi Style`,
        description: finalDescription,
        keywords: `${title}, ${category.toLowerCase()}, streetwear Pakistan, custom sizing, Huzi Style`,
        alternates: {
            canonical: `/product/${product.slug}`,
        },
        openGraph: {
            title: title,
            description: finalDescription,
            url: `/product/${product.slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: title,
                }
            ],
            type: 'website',
            siteName: 'Huzi Style',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [imageUrl],
        }
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    return <ProductClient slug={slug} />;
}
