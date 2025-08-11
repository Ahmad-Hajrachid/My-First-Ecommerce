import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  // Basic Auth Fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  
  // Basic Profile
  phone: { type: String },
  
  // Simple Address (single address for now)
  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
    country: { type: String, default: 'Jordan' }
  },

  // Account Status
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});


const User = mongoose.model('User', userSchema);
export default User;