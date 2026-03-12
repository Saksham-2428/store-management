const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🛒 Store Inventory Management API is running!',
    version: '1.0.0',
    endpoints: {
      addProduct:       'POST   /products',
      getAllProducts:   'GET    /products',
      getProductById:   'GET    /products/:id',
      updateProduct:    'PUT    /products/:id',
      deleteProduct:    'DELETE /products/:id',
      searchByName:     'GET    /products/search?name=xyz',
      filterByCategory: 'GET    /products/category?cat=xyz',
    },
  });
});

app.use('/products', productRoutes);

// ─── Error Middleware ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});
