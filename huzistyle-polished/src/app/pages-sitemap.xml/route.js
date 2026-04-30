export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://huzistyle.com';
    const staticPages = [
        '',
        '/shop',
        '/collections',
        '/about',
        '/contact',
        '/faq',
        '/shipping',
        '/returns',
        '/privacy',
        '/terms',
        '/size-guide',
        '/cod',
        '/compare',
        '/lookbook'
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
            .map((url) => {
                return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
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
