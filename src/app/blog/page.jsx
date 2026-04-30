'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowLeft, Clock, Calendar, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs, getBlogCategories } from '../../data/blogs';
import '../../styles/Blog.css';

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="blog-page" style={{ paddingTop: '200px', textAlign: 'center' }}>Loading...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}

function BlogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', ...getBlogCategories()];

  // Sync page from URL
  const currentPageFromUrl = parseInt(searchParams.get('page') || '1', 10);

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

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  // Clamp current page to valid range
  const currentPage = totalPages === 0 ? 1 : Math.min(currentPageFromUrl, totalPages);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const goToPage = useCallback((page) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : '/blog', { scroll: false });
  }, [router, searchParams]);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    if (currentPageFromUrl > 1) {
      goToPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-title">The Journal</h1>
        <p className="blog-description">
          Product spotlights, tech news, life-changing tips, and style guides — curated to keep you ahead of the game.
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

      {/* Blog Grid — 2 cards per row */}
      <div className="blog-grid blog-grid-2col">
        {paginatedBlogs.map((blog, index) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="blog-card"
            style={{ animationDelay: `${index * 0.06}s` }}
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

      {/* Empty State */}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="blog-pagination">
          <button
            className="blog-pagination-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          {getPageNumbers().map((page, idx) => (
            <React.Fragment key={page}>
              {idx > 0 && getPageNumbers()[idx - 1] !== page - 1 && (
                <span className="blog-pagination-ellipsis">...</span>
              )}
              <button
                className={`blog-pagination-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

          <button
            className="blog-pagination-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
