const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchByName,
  filterByCategory,
} = require('../controllers/productController');

// Search & filter routes MUST come before /:id to avoid conflict
router.get('/search', searchByName);
router.get('/category', filterByCategory);

// CRUD routes
router.post('/', addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
