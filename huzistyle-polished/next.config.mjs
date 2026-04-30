/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',          // Static export for Cloudflare Pages
    images: {
        unoptimized: true,     // Required for static export
    },
    trailingSlash: true,       // Better for CF Pages routing
    compress: true,
    poweredByHeader: false,    // Don't leak framework info
};

export default nextConfig;
