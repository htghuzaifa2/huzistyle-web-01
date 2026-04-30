'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Clock, Calendar, Search, X } from 'lucide-react';
import { blogs, getBlogCategories } from '../../data/blogs';
import '../../styles/Blog.css';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', ...getBlogCategories()];

  const filteredBlogs = useMemo(() => {
    let results = activeCategory === 'All'
      ? blogs
      : blogs.filter(blog => blog.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(blog =>
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(q)) ||
        blog.category.toLowerCase().includes(q)
      );
    }

    return results;
  }, [activeCategory, searchQuery]);

  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-title">The Journal</h1>
        <p className="blog-description">
          Style insights, behind-the-scenes stories, and guides from the world of Huzi Style.
        </p>
      </div>

      {/* Search Bar */}
      <div className="blog-search-bar">
        <Search size={18} className="blog-search-icon" />
        <input
          type="text"
          className="blog-search-input"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="blog-search-clear" onClick={handleClearSearch} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="blog-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => { setActiveCategory(category); setSearchQuery(''); }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Result count */}
      {(searchQuery || activeCategory !== 'All') && (
        <p className="blog-results-count">
          {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
          {searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}
        </p>
      )}

      {/* Blog Grid */}
      <div className="blog-grid">
        {/* Featured Card (first blog) */}
        {featuredBlog && (
          <Link href={`/blog/${featuredBlog.slug}`} className="blog-card-featured">
            <div className="blog-card-image">
              <img
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                loading="lazy"
              />
              <span className="blog-card-category">{featuredBlog.category}</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span><Calendar size={14} /> {formatDate(featuredBlog.date)}</span>
                <span className="blog-card-meta-separator" />
                <span><Clock size={14} /> {featuredBlog.readTime}</span>
              </div>
              <h2 className="blog-card-title">{featuredBlog.title}</h2>
              <p className="blog-card-excerpt">{featuredBlog.excerpt}</p>
              <div className="blog-card-footer">
                <div className="blog-card-author">
                  <div className="blog-card-author-avatar">HS</div>
                  {featuredBlog.author}
                </div>
                <div className="blog-card-read-more">
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Regular Cards */}
        {remainingBlogs.map((blog, index) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="blog-card"
            style={{ animationDelay: `${(index + 1) * 0.08}s` }}
          >
            <div className="blog-card-image">
              <img
                src={blog.coverImage}
                alt={blog.title}
                loading="lazy"
              />
              <span className="blog-card-category">{blog.category}</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span><Calendar size={14} /> {formatDate(blog.date)}</span>
                <span className="blog-card-meta-separator" />
                <span><Clock size={14} /> {blog.readTime}</span>
              </div>
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-excerpt">{blog.excerpt}</p>
              <div className="blog-card-footer">
                <div className="blog-card-author">
                  <div className="blog-card-author-avatar">HS</div>
                  {blog.author}
                </div>
                <div className="blog-card-read-more">
                  Read <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="blog-empty-state">
          <Search size={40} strokeWidth={1} />
          <p>No articles found{searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}.</p>
          <button
            className="btn btn-outline"
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
          >
            View All Articles
          </button>
        </div>
      )}
    </div>
  );
}
