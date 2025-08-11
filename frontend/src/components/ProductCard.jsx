import React, { useState } from 'react'
import { Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../store/cart'
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react'
import toast from 'react-hot-toast'

const ProductCard = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const carts = useSelector(store => store.cart.items)
    const { _id, name, price, image, rating = 4.5, originalPrice } = props.data
    const { viewMode = 'grid' } = props
    const dispatch = useDispatch()

    // Check if product is already in cart
    const isInCart = carts.some(item => item.productId === _id)
    const cartItem = carts.find(item => item.productId === _id)

    const handleAddToCart = async () => {
        await dispatch(addToCart({
            productId: _id,
            quantity: 1,
            price: price,
            name:name,
            image:image
        }))
        toast.success("Added to cart!", {
            icon: '🛒',
            style: {
                background: '#EAB308',
                color: '#000',
            },
        })
    }

    const handleToggleLike = () => {
        setIsLiked(!isLiked)
        toast(isLiked ? "Removed from wishlist" : "Added to wishlist", {
            icon: isLiked ? '💔' : '❤️',
        })
    }

    const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null

    if (viewMode === 'list') {
        return (
            <div className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-yellow-100 overflow-hidden'>
                <div className='flex p-6 gap-6'>
                    {/* Image Section */}
                    <div className='relative flex-shrink-0'>
                        <Link to={`/product/${_id}`} className='block relative group'>
                            <div className='w-32 h-32 bg-yellow-50 rounded-xl overflow-hidden'>
                                {!imageLoaded && (
                                    <div className='w-full h-full bg-yellow-100 animate-pulse flex items-center justify-center'>
                                        <div className='w-8 h-8 bg-yellow-200 rounded'></div>
                                    </div>
                                )}
                                <img 
                                    src={image} 
                                    alt={name}
                                    onLoad={() => setImageLoaded(true)}
                                    className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                                        imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Content Section */}
                    <div className='flex-1 flex flex-col justify-between'>
                        <div>
                            <Link to={`/product/${_id}`}>
                                <h3 className='text-xl font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors line-clamp-2'>
                                    {name}
                                </h3>
                            </Link>
                            
                            {/* Rating */}
                            <div className='flex items-center gap-2 mb-3'>
                                <div className='flex items-center'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-4 h-4 ${
                                                i < Math.floor(rating) 
                                                    ? 'text-yellow-500 fill-current' 
                                                    : 'text-gray-300'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <span className='text-sm text-gray-600'>({rating})</span>
                            </div>

                            {/* Price */}
                            <div className='flex items-center gap-2 mb-4'>
                                <span className='text-2xl font-bold text-black'>${price}</span>
                                {originalPrice && (
                                    <>
                                        <span className='text-lg text-gray-500 line-through'>${originalPrice}</span>
                                        <span className='bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold'>
                                            -{discountPercentage}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-3'>
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                                    isInCart
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-yellow-500 text-black hover:bg-yellow-600'
                                }`}
                            >
                                <ShoppingCart className='w-4 h-4' />
                                {isInCart ? `In Cart (${cartItem?.quantity})` : 'Add to Cart'}
                            </button>
                            
                            <button
                                onClick={handleToggleLike}
                                className={`p-2 rounded-xl transition-all duration-200 ${
                                    isLiked 
                                        ? 'bg-red-100 text-red-600' 
                                        : 'bg-yellow-50 text-gray-600 hover:bg-yellow-100'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Grid view (default)
    return (
        <div 
            className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-yellow-100 overflow-hidden group relative'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Discount Badge */}
            {discountPercentage && (
                <div className='absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10'>
                    -{discountPercentage}%
                </div>
            )}

            {/* Wishlist Button */}
            <button
                onClick={handleToggleLike}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10 ${
                    isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
            >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Image Section */}
            <div className='relative overflow-hidden bg-yellow-50'>
                <Link to={`/product/${_id}`} className='block relative group'>
                    <div className='aspect-square relative'>
                        {!imageLoaded && (
                            <div className='absolute inset-0 bg-yellow-100 animate-pulse flex items-center justify-center'>
                                <div className='w-12 h-12 bg-yellow-200 rounded-lg'></div>
                            </div>
                        )}
                        <img 
                            src={image} 
                            alt={name}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                                imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        
                        {/* Hover Overlay */}
                        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <div className='bg-yellow-500/90 backdrop-blur-sm p-2 rounded-full'>
                                <Eye className='w-5 h-5 text-black' />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Content Section */}
            <div className='p-5 space-y-3'>
                {/* Rating */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                    i < Math.floor(rating) 
                                        ? 'text-yellow-500 fill-current' 
                                        : 'text-gray-300'
                                }`} 
                            />
                        ))}
                    </div>
                    <span className='text-sm text-gray-500'>({rating})</span>
                </div>

                {/* Product Name */}
                <Link to={`/product/${_id}`}>
                    <h3 className='text-lg font-semibold text-gray-900 hover:text-yellow-600 transition-colors line-clamp-2 leading-tight'>
                        {name}
                    </h3>
                </Link>

                {/* Price */}
                <div className='flex items-center gap-2'>
                    <span className='text-2xl font-bold text-black'>${price}</span>
                    {originalPrice && (
                        <span className='text-sm text-gray-500 line-through'>${originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        isInCart
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-black text-yellow-400 hover:bg-gray-800'
                    }`}
                >
                    <ShoppingCart className='w-4 h-4' />
                    {isInCart ? `Add More (${cartItem?.quantity})` : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}

export default ProductCard