import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeQuantity } from '../store/cart'

const CartItem = (props) => {
    const { productId, quantity } = props.data
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [imageError, setImageError] = useState(false)
    const dispatch = useDispatch()

    const fetchProduct = async () => {
        try {
            setLoading(true)
            console.log('Fetching product with ID:', productId)
            
            const response = await fetch(`http://localhost:4444/api/products/${productId}`)
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const productData = await response.json()
            console.log('API Response:', productData)
            
            setProduct(productData)
            setError(null)
        } catch (error) {
            console.error('Error fetching product:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (productId) {
            fetchProduct()
        }
    }, [productId])

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem()
        } else if (newQuantity <= 99) { // Max quantity limit
            dispatch(changeQuantity({ productId, quantity: newQuantity }))
        }
    }

    const handleRemoveItem = () => {
        dispatch(changeQuantity({ productId, quantity: 0 }))
    }

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00'
    }

    const handleImageError = () => {
        setImageError(true)
    }

    if (loading) {
        return (
            <div className="cart-item bg-white rounded-lg p-4 mb-3 shadow-sm animate-pulse">
                <div className="flex space-x-4">
                    <div className="bg-gray-300 rounded-md w-16 h-16"></div>
                    <div className="flex-1 space-y-2">
                        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                        <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="cart-item bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between">
                    <div className="text-red-600">
                        <p className="font-medium">Error loading product</p>
                        <p className="text-sm">{error}</p>
                    </div>
                    <button
                        onClick={handleRemoveItem}
                        className="text-red-500 hover:text-red-700 font-bold text-lg"
                        title="Remove item"
                    >
                        ×
                    </button>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="cart-item bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between">
                    <div className="text-yellow-700">
                        <p className="font-medium">Product not found</p>
                        <p className="text-sm">ID: {productId}</p>
                    </div>
                    <button
                        onClick={handleRemoveItem}
                        className="text-yellow-600 hover:text-yellow-800 font-bold text-lg"
                        title="Remove item"
                    >
                        ×
                    </button>
                </div>
            </div>
        )
    }

    const totalPrice = (product.price || props.data.price || 0) * quantity

    return (
        <div className="cart-item bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    {product.image && !imageError ? (
                        <img
                            src={product.image}
                            alt={product.name || product.title}
                            className="w-16 h-16 object-cover rounded-md"
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 truncate pr-2">
                            {product.name || product.title || 'Unknown Product'}
                        </h3>
                        <button
                            onClick={handleRemoveItem}
                            className="text-gray-400 hover:text-red-500 font-bold text-lg flex-shrink-0"
                            title="Remove item"
                        >
                            ×
                        </button>
                    </div>
                    
                    {product.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="px-3 py-1 border-x border-gray-200 min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                    disabled={quantity >= 99}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-sm text-gray-600">
                                ${formatPrice(product.price)} each
                            </p>
                            <p className="font-semibold text-gray-900">
                                ${formatPrice(totalPrice)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem