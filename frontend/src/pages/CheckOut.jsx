import React, { useState, useEffect, useMemo }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuantity } from '../store/cart'
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import axios from 'axios'
import {useNavigate} from 'react-router'

// Initialize Stripe 
const stripePromise = loadStripe('pk_test_51RsJI9C4sT454gz4JCOQ8SZg2aM3fj1ZI3fTN0tu0APAfKHnyMne4NmBRqgC1JZ5DeS2soVMp95DhotSg3BXQsGT00NbO3VtKk')

// Main CheckOut component wrapped with Stripe Elements
const CheckOut = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm />
        </Elements>
    )
} 

const CheckOutForm = () => {
    const [cardReady, setCardReady] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const carts = useSelector(store => store.cart.items)
    const dispatch = useDispatch()

    // Form state
    const [formData, setFormData] = useState({
        // Customer Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Shipping Address
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United Arab Emirates',
        
        // Options
        saveInfo: false,
        newsletter: false
    })

    const [errors, setErrors] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    // Calculate order totals
    const orderSummary = useMemo(() => {
        let subtotal = 0
        let totalItems = 0
        
        carts.forEach(item => {
            totalItems += item.quantity
            subtotal += (item.price || 0) * item.quantity
        })
        
        const shipping = subtotal > 200 ? 0 : 25
        const vat = subtotal * 0.05 // UAE VAT IS 5%
        const total = subtotal + shipping + vat
        
        return { subtotal, shipping, vat, total, totalItems }
    }, [carts])

    // Create PaymentIntent on component mount or when total changes
    useEffect(() => {
        if (carts.length > 0 && orderSummary.total > 0) {
            createPaymentIntent()
        }
    }, [orderSummary.total])

    // Create PaymentIntent
    const createPaymentIntent = async () => {
        try {
            const response = await axios.post('http://localhost:4444/api/create-payment-intent', {
                amount: Math.round(orderSummary.total * 100), 
                currency: 'aed',
                metadata: {
                    orderId: `ORDER-${Date.now()}`,
                    customerEmail: formData.email,
                    itemCount: orderSummary.totalItems
                }
            })
            
            if (response.data.clientSecret) {
                setClientSecret(response.data.clientSecret)
                setPaymentIntentId(response.data.paymentIntentId)
            } else {
                throw new Error('Failed to create payment intent')
            }
        } catch (error) {
            console.error('Error creating payment intent:', error)
        }
    }
    const navigate = useNavigate()
    // Redirect if cart is empty
    useEffect(() => {
        if (carts.length === 0 && !orderPlaced) {
            // In a real app, you'd use React Router to redirect
        }
    }, [carts.length, orderPlaced])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        // Customer Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (formData.phone && !/^(\+971|00971|971)?[0-9]{8,9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid UAE phone number'
        }
        
        // Shipping Address
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'Emirate is required'
        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'Postal code is required'
        } else if (!/^\d{5}$/.test(formData.zipCode)) {  
            newErrors.zipCode = 'Please enter a valid postal code'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch(changeQuantity({ productId, quantity: newQuantity }))
    }

    const handlePlaceOrder = async () => {
        if (!stripe || !elements || !validateForm()) return
        
        setIsProcessing(true)
        
        try {
            const cardElement = elements.getElement(CardElement)
            console.log('cardElement:', cardElement);
            if (!cardElement) {
                console.error('Card element is null - check element creation and mounting');
                alert('Payment method not ready. Please try again.')
                return;
            }

            // Create new payment intent if needed
            if (!clientSecret) {
                await createPaymentIntent()
                if (!clientSecret) {
                    alert('Unable to initialize payment. Please try again.')
                    return
                }
            }
            
            // Confirm payment with Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        address: {
                            line1: formData.address,
                            city: formData.city,
                            state: formData.state,
                            postal_code: formData.zipCode,
                            country: 'AE',
                        },
                    },
                },
            })
            
            if (error) {
                console.error('Payment failed:', error)
                alert(`Payment failed: ${error.message}`)
                return
            }
            
            if (paymentIntent.status === 'succeeded') {
                // Create order record in your backend
                const order = {
                    id: `ORDER-${Date.now()}`,
                    paymentIntentId: paymentIntent.id,
                    items: carts,
                    customer: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone
                    },
                    shipping: {
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: formData.country
                    },
                    summary: orderSummary,
                    timestamp: new Date().toISOString()
                }
                
                // Save order to your backend
                await axios.post('http://localhost:4444/api/orders', order)
                
                console.log('Order placed successfully:', order)
                
                // Clear cart
                carts.forEach(item => {
                    dispatch(changeQuantity({ productId: item.productId, quantity: 0 }))
                })
                
                setOrderPlaced(true)
            }
            
        } catch (error) {
            console.error('Order processing error:', error)
            alert('There was an error processing your order. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    const formatPrice = (price) => {
        return typeof price === 'number' ? `${price.toFixed(2)} AED` : '0.00 AED'
    }

    // Stripe Card Element styling
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#374151',
                '::placeholder': {
                    color: '#9CA3AF',
                },
                fontFamily: '"Inter", "system-ui", "sans-serif"',
                fontSmoothing: 'antialiased',
            },
            invalid: {
                color: '#EF4444',
                iconColor: '#EF4444',
            },
        },
        hidePostalCode: true, // We're collecting this separately
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-6">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    if (carts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
                    <button 
                        onClick={() => window.history.back()} 
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Customer Information Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.city ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Emirate *
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.state ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Emirate</option>
                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                        <option value="Dubai">Dubai</option>
                                        <option value="Sharjah">Sharjah</option>
                                        <option value="Ajman">Ajman</option>
                                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                        <option value="Fujairah">Fujairah</option>
                                    </select>
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Postal Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Payment Information Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Information *
                                </label>
                                <div className="border border-gray-300 rounded-md p-3 bg-white">
                                    <CardElement 
                                        options={cardElementOptions}
                                        onReady={() => {
                                            console.log('CardElement is ready');
                                            setCardReady(true);
                                        }}
                                        onChange={(event) => {
                                            console.log('CardElement changed:', event);
                                            if (event.error) {
                                                console.error('CardElement error:', event.error);
                                            }
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Your payment information is securely processed by Stripe.
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="saveInfo"
                                        checked={formData.saveInfo}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-700">Save payment method for future purchases</span>
                                </label>
                            </div>

                            {/* Security badges */}
                            <div className="flex items-center justify-center space-x-4 pt-4">
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    SSL Secured
                                </div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Powered by Stripe
                                </div>
                            </div>
                        </div>

                         {/* Order Items Section  */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
                            <div className="space-y-3">
                                {carts.map((item, index) => (
                                    <div key={`${item.productId}-${index}`} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name || item.productId}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <span 
                                                    className="text-xs text-gray-500"
                                                    style={item.image ? {display: 'none'} : {}}
                                                >
                                                    IMG
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {item.name || item.title || item.productId}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatPrice(item.price || 0)} each
                                                </p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.productId, Math.max(0, item.quantity - 1))}
                                                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm px-2">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{formatPrice((item.price || 0) * item.quantity)}</p>
                                            <p className="text-xs text-gray-500">
                                                {item.quantity} × {formatPrice(item.price || 0)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing || !stripe || !cardReady}
                                className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                            >
                                {isProcessing ? 'Processing Payment...' : `Place Order - ${formatPrice(orderSummary.total)}`}
                            </button>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal ({orderSummary.totalItems} items)</span>
                                    <span>{formatPrice(orderSummary.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{orderSummary.shipping === 0 ? 'Free' : formatPrice(orderSummary.shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>VAT (5%)</span>
                                    <span>{formatPrice(orderSummary.vat)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>{formatPrice(orderSummary.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {orderSummary.shipping === 0 && (
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Free shipping included!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut