import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  shipping: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }, // This will store the emirate
    zipCode: { type: String, required: true },
    country: { type: String, default: 'United Arab Emirates' }
  },
  summary: {
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    vat: { type: Number, required: true },
    total: { type: Number, required: true },
    totalItems: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Order = mongoose.model('Order', orderSchema);
export default Order;