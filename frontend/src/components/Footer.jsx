import React from 'react'
import { Link } from 'react-router'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Home
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-black text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          
          {/* Brand Section */}
          <div className='space-y-4'>
            <Link to="/" className='flex items-center space-x-2 group'>
              <div className='p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-400 group-hover:from-yellow-400 group-hover:to-yellow-300 transition-all duration-200 shadow-lg'>
                <Home className='text-black w-5 h-5' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent'>
                Elegant Stores
              </span>
            </Link>
            <p className='text-yellow-100 text-sm leading-relaxed'>
              Your one-stop destination for quality products at amazing prices. 
              We're committed to delivering excellence in every purchase.
            </p>
            <div className='flex space-x-4'>
              <a href="#" className='p-2 bg-black/50 hover:bg-yellow-600 rounded-full transition-colors duration-200 border border-yellow-500/30 hover:border-yellow-400'>
                <Facebook className='w-4 h-4' />
              </a>
              <a href="#" className='p-2 bg-black/50 hover:bg-yellow-600 rounded-full transition-colors duration-200 border border-yellow-500/30 hover:border-yellow-400'>
                <Twitter className='w-4 h-4' />
              </a>
              <a href="#" className='p-2 bg-black/50 hover:bg-yellow-600 rounded-full transition-colors duration-200 border border-yellow-500/30 hover:border-yellow-400'>
                <Instagram className='w-4 h-4' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-yellow-400 border-b border-yellow-500/30 pb-2'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to="/" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/deals" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Special Deals
                </Link>
              </li>
              <li>
                <Link to="/about" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-yellow-400 border-b border-yellow-500/30 pb-2'>Customer Service</h3>
            <ul className='space-y-2'>
              <li>
                <Link to="/contact" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/support" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block'>
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-yellow-400 border-b border-yellow-500/30 pb-2'>Get in Touch</h3>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <MapPin className='w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0' />
                <p className='text-yellow-200 text-sm'>
                  123 Commerce Street<br />
                  Business District<br />
                  City, State 12345
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='w-4 h-4 text-yellow-500 flex-shrink-0' />
                <a href="tel:+1234567890" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm'>
                  +1 (234) 567-8900
                </a>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='w-4 h-4 text-yellow-500 flex-shrink-0' />
                <a href="mailto:info@ElegantStores.com" className='text-yellow-200 hover:text-yellow-100 transition-colors duration-200 text-sm'>
                  info@ElegantStores.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='border-t border-amber-500/30 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-1 text-sm text-amber-200'>
              <span>© {currentYear} Elegant Stores. Made with</span>
              <Heart className='w-4 h-4 text-amber-500' />
              <span>All rights reserved.</span>
            </div>
            <div className='flex space-x-6 text-sm'>
              <Link to="/privacy" className='text-amber-200 hover:text-amber-100 transition-colors duration-200 relative group'>
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="/terms" className='text-amber-200 hover:text-amber-100 transition-colors duration-200 relative group'>
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="/cookies" className='text-amber-200 hover:text-amber-100 transition-colors duration-200 relative group'>
                Cookie Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer