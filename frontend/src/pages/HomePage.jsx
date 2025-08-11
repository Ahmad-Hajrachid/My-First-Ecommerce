import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Users, 
  Shield, 
  Truck,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import ProductCart from '../components/ProductCard'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      const result = await axios.get('http://localhost:4444/api/products')
      // Get first 4 products as featured
      setFeaturedProducts(result.data.slice(0, 4))
    } catch (error) {
      console.error("Error fetching featured products", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "Your data and payments are protected with enterprise-grade security"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep nationwide"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Quality Products",
      description: "Carefully curated items that meet our high standards"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our friendly team is here to help you anytime, anywhere"
    }
  ]


  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-yellow-500 to-white rounded-3xl text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              Welcome to Elegant Stores
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Discover Amazing
              <span className="block bg-black bg-clip-text text-transparent">
                Products
              </span>
              at Great Prices
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto">
              Shop the latest trends and timeless classics. Quality products, 
              unbeatable prices, and exceptional service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </section>

      

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-slate-800 font-semibold">
            <TrendingUp className="w-5 h-5" />
            Featured Products
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Trending Right Now
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Check out our most popular products loved by thousands of customers
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCart key={product._id} data={product} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-black text-amber-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Why Choose Elegant Stores?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-amber-400 rounded-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-yellow-500 rounded-3xl text-white p-8 lg:p-12">
  <div className="text-center space-y-6">
    <h2 className="text-3xl lg:text-4xl font-bold">
      Ready to Start Shopping?
    </h2>
    <p className="text-amber-100 text-lg max-w-2xl mx-auto">
      Join thousands of satisfied customers and discover your next favorite product today
    </p>
    <Link
      to="/products"
      className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
    >
      <ShoppingBag className="w-5 h-5" />
      Start Shopping
    </Link>
  </div>
</section>
    </div>
  )
}

export default HomePage