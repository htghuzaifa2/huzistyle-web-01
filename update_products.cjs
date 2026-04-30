const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const updatedProducts = products.map(product => {
    let newPrice = 44;

    return {
        ...product,
        price: newPrice,
        currency: 'USD'
    };
});

fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 4));
console.log('Successfully updated products.json to USD');
