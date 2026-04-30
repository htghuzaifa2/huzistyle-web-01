'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { blogs, getBlogBySlug, getRelatedBlogs } from '../../../data/blogs';
import '../../../styles/Blog.css';

export default function BlogPostClient({ slug }) {
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="blog-post-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Article Not Found</h1>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>
          The article you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/blog" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs(slug, 3);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  const renderContent = (contentBlocks) => {
    return contentBlocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return <p key={index}>{block.text}</p>;
      }
      if (block.type === 'heading') {
        return <h2 key={index}>{block.text}</h2>;
      }
      return null;
    });
  };

  return (
    <div className="blog-post-page">
      {/* Back Link */}
      <Link href="/blog" className="blog-back-link">
        <ArrowLeft size={16} /> Back to The Journal
      </Link>

      {/* Post Header */}
      <div className="blog-post-header">
        <span className="blog-post-category">{blog.category}</span>
        <h1 className="blog-post-title">{blog.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-meta-item">
            <Calendar size={14} /> {formatDate(blog.date)}
          </span>
          <span className="blog-post-meta-separator" style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-text-light)', opacity: 0.5 }} />
          <span className="blog-post-meta-item">
            <Clock size={14} /> {blog.readTime}
          </span>
          <span className="blog-post-meta-separator" style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-text-light)', opacity: 0.5 }} />
          <span className="blog-post-meta-item">
            By {blog.author}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="blog-post-cover">
        <img src={blog.coverImage} alt={blog.title} />
      </div>

      {/* Post Content */}
      <div className="blog-post-content">
        {renderContent(blog.content)}
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="blog-post-tags">
          {blog.tags.map(tag => (
            <span key={tag} className="blog-post-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="blog-related-section">
          <h2 className="blog-related-title">You Might Also Like</h2>
          <div className="blog-related-grid">
            {relatedBlogs.map(related => (
              <Link key={related.id} href={`/blog/${related.slug}`} className="blog-related-card">
                <div className="blog-related-card-image">
                  <img
                    src={related.coverImage}
                    alt={related.title}
                    loading="lazy"
                  />
                </div>
                <div className="blog-related-card-body">
                  <p className="blog-related-card-meta">
                    {formatDate(related.date)} &middot; {related.readTime}
                  </p>
                  <h3 className="blog-related-card-title">{related.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
