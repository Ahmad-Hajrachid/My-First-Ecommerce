import Stripe from 'stripe';
import dotenv from "dotenv"
dotenv.config(); 
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createCheckOut = async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;
    
    // Validate required fields
    if (!amount || !currency) {
      return res.status(400).json({
        error: 'Amount and currency are required'
      });
    }
    
    // Create PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in smallest currency unit (fils for AED)
      currency: currency.toLowerCase(),
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });
    
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      message: error.message
    });
  }
};