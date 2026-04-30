import { blogs } from '../../../data/blogs';
import BlogPostClient from './BlogPostClient';

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
  const blog = blogs.find(b => b.slug === params.slug);
  if (!blog) {
    return { title: 'Article Not Found | Huzi Style' };
  }

  return {
    title: `${blog.title} | Huzi Style`,
    description: blog.excerpt,
    keywords: blog.tags ? blog.tags.join(', ') : '',
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      images: [{ url: blog.coverImage, width: 800, height: 500, alt: blog.title }],
    },
  };
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient slug={params.slug} />;
}
