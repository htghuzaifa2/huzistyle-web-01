// Blog posts data for Huzi Style — Product spotlight articles only
// Each blog post has a slug (URL), title, excerpt, content, category, date, cover image, and read time

import { productBlogs } from './productBlogs.js';

export const blogs = [
  ...productBlogs
];

// Helper function to get a blog by slug
export function getBlogBySlug(slug) {
  return blogs.find(blog => blog.slug === slug) || null;
}

// Helper function to get blogs by category
export function getBlogsByCategory(category) {
  return blogs.filter(blog => blog.category === category);
}

// Helper function to get all unique categories
export function getBlogCategories() {
  return [...new Set(blogs.map(blog => blog.category))];
}

// Helper function to get related blogs (excluding current, shuffled, return limit)
export function getRelatedBlogs(currentSlug, limit = 6) {
  // Simple seeded shuffle based on slug to get consistent "random" related posts
  const seed = currentSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const others = blogs.filter(blog => blog.slug !== currentSlug);
  const shuffled = others.sort((a, b) => {
    const hashA = (seed * 31 + a.id * 17) % 1000;
    const hashB = (seed * 31 + b.id * 17) % 1000;
    return hashA - hashB;
  });
  return shuffled.slice(0, limit);
}
