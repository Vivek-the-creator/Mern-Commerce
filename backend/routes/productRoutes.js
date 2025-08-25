import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Read JSON data from file
const dataPath = path.resolve('data/products_with_categories.json');
let products = [];

try {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  products = JSON.parse(jsonData);
} catch (err) {
  console.error('Error loading product JSON:', err);
}

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET a single product by ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
