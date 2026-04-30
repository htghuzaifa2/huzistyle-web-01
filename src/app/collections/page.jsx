import Link from 'next/link';
import { products } from '../../data/products';
import { seoConfig } from '../../config/seoConfig';
// import '../pages/Categories.css';

export const metadata = {
    title: seoConfig.categories.title,
    description: seoConfig.categories.description,
    keywords: seoConfig.categories.keywords,
    openGraph: {
        title: seoConfig.categories.title,
        description: seoConfig.categories.description,
        url: seoConfig.categories.canonicalUrl,
        images: [
            {
                url: seoConfig.categories.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.categories.canonicalUrl,
    },
};

export default function CollectionsPage() {
    const categoriesData = [
        { name: 'Men', image: 'https://i.postimg.cc/Vvr0tpD7/men.webp', link: '/shop/men' },
        { name: 'Women', image: 'https://i.postimg.cc/pXKgvZHk/women-Kimi.jpg', link: '/shop/women' },
        { name: 'Kids', image: 'https://i.postimg.cc/Gtgny3XN/kids-Kimi.jpg', link: '/shop/kids' },
        { name: 'Gaming Outfits', image: 'https://i.postimg.cc/m27GrVTG/clair-obscur-expedition-33.avif', link: '/shop/gaming-outfits' },
        { name: 'Hoodies', image: 'https://i.postimg.cc/tJfM9bRM/Hoodie-kimi.jpg', link: '/shop/hoodies' },
        { name: 'Jackets', image: 'https://i.postimg.cc/zfvPmT53/jackets-Kimi.webp', link: '/shop/jackets' },
        { name: 'Ghost of Yotei', image: 'https://i.postimg.cc/HnBsv2nK/ghost-of-yotei.webp', link: '/shop/ghost-of-yotei' },
    ];

    return (
        <div className="content-page container categories-page">
            <div className="content-header text-center">
                <h1 className="h2">Browse Categories</h1>
                <p className="text-muted">Explore our wide range of premium collections.</p>
            </div>

            <div className="categories-grid">
                {categoriesData.map((cat) => (
                    <Link href={cat.link} key={cat.name} className="category-tile">
                        <div className="category-tile-image-wrapper">
                            <img src={cat.image} alt={cat.name} className="category-tile-image" />
                            <div className="category-tile-overlay"></div>
                        </div>
                        <div className="category-tile-content">
                            <h3 className="category-tile-title">{cat.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
