import { products } from './src/data/products.js';

console.log("Products loaded successfully");
console.log("Count:", products.length);
console.log("First product:", products[0]);
console.log("Last product:", products[99]);

// Check for duplicate slugs
const slugs = products.map(p => p.slug);
const uniqueSlugs = new Set(slugs);
if (slugs.length !== uniqueSlugs.size) {
    console.error("Duplicate slugs found!");
} else {
    console.log("All slugs are unique.");
}
