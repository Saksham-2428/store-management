const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    productCode: {
      type: String,
      required: [true, 'Product code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Other'],
      default: 'Other',
    },
    supplierName: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
    },
    quantityInStock: {
      type: Number,
      required: [true, 'Quantity in stock is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    reorderLevel: {
      type: Number,
      required: [true, 'Reorder level is required'],
      min: [1, 'Reorder level must be greater than 0'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0.01, 'Unit price must be a positive value'],
    },
    manufactureDate: {
      type: Date,
      required: [true, 'Manufacture date is required'],
    },
    productType: {
      type: String,
      required: [true, 'Product type is required'],
      enum: ['Perishable', 'Non-Perishable'],
    },
    status: {
      type: String,
      enum: ['Available', 'Out of Stock'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-update status based on quantity
productSchema.pre('save', function (next) {
  if (this.quantityInStock === 0) {
    this.status = 'Out of Stock';
  } else {
    this.status = 'Available';
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
