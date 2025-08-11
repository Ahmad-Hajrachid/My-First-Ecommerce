import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/cart'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Check
} from 'lucide-react'
import toast from 'react-hot-toast'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()
  const carts = useSelector(store => store.cart.items)

  // Check if product is in cart
  const cartItem = carts.find(item => item.productId === id)
  const isInCart = Boolean(cartItem)

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
  }

  const handlePlusQuantity = () => {
    setQuantity(quantity + 1)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:4444/api/products/${id}`)
        const productData = await response.json()
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product.price) {
      toast.error('Price information missing')
      return
    }

    dispatch(addToCart({
      productId: product._id,
      quantity: quantity,
      price: product.price
    }))
    
    toast.success(`${quantity} item(s) added to cart!`, {
      icon: '🛒',
      style: {
        background: '#000000',
        color: '#fff',
      },
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} - $${product.price}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share failed', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleToggleLike = () => {
    setIsLiked(!isLiked)
    toast(isLiked ? "Removed from wishlist" : "Added to wishlist", {
      icon: isLiked ? '💔' : '❤️',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-500 to-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
          <p className="text-blue-100 text-lg">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-500 to-white">
        <div className="text-center space-y-6">
          <div className="text-6xl">😞</div>
          <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
          <p className="text-blue-100">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const rating = product.rating || 4.5
  const reviewCount = product.reviewCount || 128

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-amber-400">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* Single Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Image Actions */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleShare}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleToggleLike}
                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(rating) 
                        ? 'text-amber-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-lg text-gray-600">
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || "This is an amazing product that will exceed your expectations. Crafted with attention to detail and made from high-quality materials."}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={handleMinusQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 border-x border-gray-300 text-lg font-semibold min-w-[80px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handlePlusQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {isInCart && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {cartItem.quantity} in cart
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-black text-amber-400 py-4 px-8 rounded-xl text-lg font-semibold hover:bg-gray-900 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              
              <button className="px-6 py-4 border-2 border-amber-400 text-amber-400 rounded-xl font-semibold hover:bg-amber-50/50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 p-6 bg-gray-50 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Warranty</p>
                  <p className="text-xs text-gray-600">1 year guarantee</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">30 days return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Products */}
      <div className="text-center">
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-500 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Products
        </Link>
      </div>
    </div>
  )
}

export default ProductDetails