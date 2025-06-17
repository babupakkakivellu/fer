const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  printType: {
    type: String,
    required: true,
    enum: ['blackAndWhite', 'color', 'custom', 'softBinding', 'spiralBinding', 'customPrint']
  },
  bindingColorType: {
    type: String,
    enum: ['blackAndWhite', 'color', 'custom']
  },
  copies: {
    type: Number,
    min: 1,
    default: 1
  },
  paperSize: {
    type: String,
    enum: ['a4', 'a3', 'letter', 'legal'],
    default: 'a4'
  },
  printSide: {
    type: String,
    enum: ['single', 'double'],
    default: 'single'
  },
  selectedPages: {
    type: String,
    default: 'all'
  },
  colorPages: {
    type: String
  },
  bwPages: {
    type: String
  },
  specialInstructions: {
    type: String,
    trim: true
  },
  files: [fileSchema],
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
    index: true
  },
  totalCost: {
    type: Number,
    min: 0,
    default: 0
  },
  orderDate: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
orderSchema.index({ orderId: 1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ phoneNumber: 1 });

module.exports = mongoose.model('Order', orderSchema);