export const dynamic = 'force-static';

import { categories } from '../../data/products';

export async function GET() {
    const baseUrl = 'https://huzistyle.com';

    // Static mapping of categories to their URL slugs
    const categoryUrls = [
        { slug: 'men', name: 'Men' },
        { slug: 'women', name: 'Women' },
        { slug: 'kids', name: 'Kids' },
        { slug: 'ghost-of-yotei', name: 'Ghost of Yotei' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categoryUrls
            .map((cat) => {
                return `
    <url>
      <loc>${baseUrl}/shop/${cat.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `;
            })
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
}
