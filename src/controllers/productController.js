const Product = require('../models/Product');

// @desc    Add a new product
// @route   POST /products
// @access  Public
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: savedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product code already exists. Please use a unique product code.',
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all products
// @route   GET /products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Update product by ID
// @route   PUT /products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product code already exists.',
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: 'Validation Error', errors: messages });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Delete product by ID
// @route   DELETE /products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Search product by name
// @route   GET /products/search?name=xyz
// @access  Public
const searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide a name query parameter' });
    }
    const products = await Product.find({
      productName: { $regex: name, $options: 'i' },
    });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Filter products by category
// @route   GET /products/category?cat=xyz
// @access  Public
const filterByCategory = async (req, res) => {
  try {
    const { cat } = req.query;
    if (!cat) {
      return res.status(400).json({ success: false, message: 'Please provide a cat query parameter' });
    }
    const products = await Product.find({
      category: { $regex: cat, $options: 'i' },
    });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchByName,
  filterByCategory,
};
