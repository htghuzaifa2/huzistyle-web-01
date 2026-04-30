export const dynamic = 'force-static';

import { products } from '../../data/products';

export async function GET() {
    const baseUrl = 'https://huzistyle.com';

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>huzistyle.com</title>
<link>${baseUrl}</link>
<description>Product feed for huzistyle.com</description>
${products.map(product => `
<item>
<g:id>${product.id}</g:id>
<g:title><![CDATA[${product.name}]]></g:title>
<g:description><![CDATA[${product.description || product.name}]]></g:description>
<g:link>${baseUrl}/product/${product.slug}</g:link>
<g:image_link>${product.image}</g:image_link>
${product.otherImages && product.otherImages.length > 0 ? `<g:additional_image_link>${product.otherImages[0]}</g:additional_image_link>` : ''}
<g:availability>in stock</g:availability>
<g:price>${product.price.toFixed(2)} USD</g:price>
<g:condition>new</g:condition>
<g:google_product_category><![CDATA[Apparel & Accessories > Clothing]]></g:google_product_category>
</item>`).join('')}
</channel>
</rss>`;

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
