import Order from "../models/orders.js";

export const saveOrder = async (req, res) => {
  try {
    const orderData = req.body;
    
    // Save to database (example with MongoDB)
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    
    res.status(201).json({
      success: true,
      orderId: savedOrder._id,
      message: 'Order saved successfully'
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save order'
    });
  }
};