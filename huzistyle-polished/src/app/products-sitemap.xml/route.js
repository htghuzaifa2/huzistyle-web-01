export const dynamic = 'force-static';

import { products } from '../../data/products';

export async function GET() {
    const baseUrl = 'https://huzistyle.com';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${products
            .map((product) => {
                return `
    <url>
      <loc>${baseUrl}/product/${product.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
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
