const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const updatedProducts = products.map(product => {
    const isHoodie = (product.categories && product.categories.some(cat => cat.toLowerCase() === 'hoodies')) ||
        (product.title && product.title.toLowerCase().includes('hoodie')) ||
        (product.category && product.category.toLowerCase() === 'hoodies');

    return {
        ...product,
        price: isHoodie ? 50 : product.price, // Note: I might need a logic for other products too if they are currently in PKR
        currency: 'USD'
    };
});

fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 4));
console.log('Successfully updated products.json');
