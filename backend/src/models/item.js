import mongoose from 'mongoose';

const jewelrySchema = new mongoose.Schema({
  // Basic info
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  description: {
    type: String,
    required: true,
    trim:true
  },
  
  price: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Simple category
  category: {
    type: String,
    required: true,
    enum: ['rings', 'necklaces', 'earrings', 'bracelets'],
    lowercase: true
  },
  
  // Basic material
  material: {
    type: String,
    required: true,
    enum: ['gold', 'silver', 'rose-gold'],
    lowercase: true
  },
  
  // Simple inventory
  stock: {
    type: Number,
    required: true,
    default: 1,
    min: 0
  },
  
  // One image for now
  image: {
    type: String,
    required: true
  },
  
  // Product active/inactive
  isActive: {
    type: Boolean,
    default: true
  }
  
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Product = mongoose.model('Jewelry', jewelrySchema); 

export default Product;