import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem'
import { toggleStatusTab, changeQuantity } from '../store/cart'
import { useNavigate } from 'react-router'

const CartTab = () => {
    const carts = useSelector(store => store.cart.items)
    const statusTab = useSelector(store => store.cart.statusTab)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab())
    }

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear all items from your cart?')) {
            // Clear cart by setting quantity to 0 for all items
            carts.forEach(item => {
                dispatch(changeQuantity({ productId: item.productId, quantity: 0 }))
            })
        }
    }

    const handleCheckout = () => {
        if (carts.length === 0) {
            alert('Your cart is empty!')
            return
        }
        
        // Here you would typically navigate to checkout page or open checkout modal
        console.log('Proceeding to checkout with items:', carts)
        navigate('/checkout')
    }

    // Calculate cart totals
    const cartSummary = useMemo(() => {
        let totalItems = 0
        let totalPrice = 0
        
        carts.forEach(item => {
            totalItems += item.quantity
            // Use price from cart item (stored when added to cart)
            totalPrice += (item.price || 0) * item.quantity
        })
        
        return { totalItems, totalPrice }
    }, [carts])

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00'
    }

    return (
        <>
            {/* Backdrop */}
            {statusTab && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={handleCloseTabCart}
                />
            )}
            
            {/* Cart Panel */}
            <div className={`fixed top-0 right-0 bg-white shadow-2xl w-96 max-w-full h-full z-50 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${statusTab === false ? "translate-x-full" : "translate-x-0"}
            `}>
                {/* Header */}
                <div className='flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50'>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-900'>Shopping Cart</h2>
                        <p className='text-sm text-gray-600'>
                            {carts.length === 0 
                                ? 'Your cart is empty' 
                                : `${cartSummary.totalItems} item${cartSummary.totalItems !== 1 ? 's' : ''}`
                            }
                        </p>
                    </div>
                    <button
                        onClick={handleCloseTabCart}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                        aria-label="Close cart"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Items */}
                <div className='flex-1 overflow-y-auto p-5 bg-gray-50'>
                    {carts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                <svg 
                                    className="w-12 h-12 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={1.5} 
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-600 mb-4">Add some items to your cart to get started.</p>
                            <button
                                onClick={handleCloseTabCart}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-1">
                                {carts.map((item, index) => 
                                    <CartItem key={`${item.productId}-${index}`} data={item} />
                                )}
                            </div>
                            
                            {/* Clear Cart Button */}
                            {carts.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={handleClearCart}
                                        className="w-full text-red-600 hover:text-red-800 text-sm font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        Clear All Items
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer - Summary and Actions */}
                {carts.length > 0 && (
                    <div className='border-t border-gray-200 bg-white p-5'>
                        {/* Cart Summary */}
                        <div className="mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Items ({cartSummary.totalItems})</span>
                                <span className="text-gray-900">${formatPrice(cartSummary.totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900">Free</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span>${formatPrice(cartSummary.totalPrice)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='grid grid-cols-2 gap-3'>
                            <button 
                                className='bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors' 
                                onClick={handleCloseTabCart}
                            >
                                Continue Shopping
                            </button>
                            <button 
                                className='bg-black text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors shadow-sm'
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                        
                        {/* Security Badge */}
                        <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Secure checkout
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartTab