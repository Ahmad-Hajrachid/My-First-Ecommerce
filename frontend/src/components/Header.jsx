import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Home, User, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTab } from '../store/cart';

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const carts = useSelector(store => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    carts.forEach(item => total += item.quantity);
    setTotalQuantity(total);
  }, [carts]);

  // Check login and role status
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);

      const role = localStorage.getItem('userRole');
      setIsAdmin(role === 'admin');
    };

    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('authChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authChange', checkLoginStatus);
    };
  }, []);

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMobileMenuOpen(false); // Close mobile menu on logout
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className='sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-yellow-200 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Home Section */}
          <div className='flex items-center space-x-4'>
            <Link
              to={'/'}
              className='flex items-center space-x-2 text-black hover:text-gray-800 transition-colors duration-200 group'
              onClick={closeMobileMenu}
            >
              <div className='p-2 rounded-lg bg-gradient-to-br from-black to-yellow-600 group-hover:from-gray-800 group-hover:to-yellow-500 transition-all duration-200 shadow-md'>
                <Home className='text-white w-5 h-5' />
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-black to-yellow-600 bg-clip-text text-transparent'>
                Elegant Stores
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              to="/"
              className='text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group'
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/products"
              className='text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group'
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className='text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group'
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>

            {/* Admin Link - only if admin */}
            {isAdmin && (
              <Link
                to="/adminpage"
                className='flex items-center text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-200 bg-yellow-50 px-3 py-1.5 rounded-lg hover:bg-yellow-100'
              >
                <ShieldCheck className="w-5 h-5 mr-1" />
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Cart and User Section */}
          <div className='hidden md:flex items-center space-x-4'>
            {isLoggedIn ? (
              <div className='flex items-center space-x-3'>
                <Link
                  to="/profile"
                  className='flex items-center space-x-2 text-gray-700 hover:text-black font-medium transition-colors duration-200 group'
                >
                  <User className='w-4 h-4 group-hover:scale-110 transition-transform' />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className='flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 group'
                >
                  <LogOut className='w-4 h-4 group-hover:scale-110 transition-transform' />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/user/login"
                className='text-gray-700 hover:text-black font-medium transition-colors duration-200 bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100'
              >
                Log In
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={handleOpenTabCart}
              className='relative group p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 border border-yellow-200'
            >
              <ShoppingCart className='text-yellow-700 w-6 h-6 group-hover:text-yellow-800 transition-colors' />

              {totalQuantity > 0 && (
                <span className='absolute -top-1 -right-1 bg-gradient-to-r from-black to-gray-800 text-yellow-400 text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-lg'>
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}

              <div className='absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black text-yellow-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg'>
                {totalQuantity === 0 ? 'Cart is empty' : `${totalQuantity} item${totalQuantity > 1 ? 's' : ''} in cart`}
              </div>
            </button>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className='flex md:hidden items-center space-x-2'>
            {/* Mobile Cart Button */}
            <button
              onClick={handleOpenTabCart}
              className='relative group p-2 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-full transition-all duration-200 hover:shadow-lg border border-yellow-200'
            >
              <ShoppingCart className='text-yellow-700 w-5 h-5 group-hover:text-yellow-800 transition-colors' />

              {totalQuantity > 0 && (
                <span className='absolute -top-1 -right-1 bg-gradient-to-r from-black to-gray-800 text-yellow-400 text-xs font-bold min-w-[18px] h-4 rounded-full flex items-center justify-center px-1 shadow-lg'>
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className='p-2 rounded-lg text-gray-700 hover:text-black hover:bg-yellow-50 transition-colors duration-200'
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-yellow-200 bg-white/95 backdrop-blur-sm'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {/* Navigation Links */}
              <Link
                to="/"
                className='block px-3 py-2 text-gray-700 hover:text-black hover:bg-yellow-50 rounded-md font-medium transition-colors duration-200'
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className='block px-3 py-2 text-gray-700 hover:text-black hover:bg-yellow-50 rounded-md font-medium transition-colors duration-200'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
              <Link
                to="/about"
                className='block px-3 py-2 text-gray-700 hover:text-black hover:bg-yellow-50 rounded-md font-medium transition-colors duration-200'
                onClick={closeMobileMenu}
              >
                About
              </Link>

              {/* Admin Link - only if admin */}
              {isAdmin && (
                <Link
                  to="/adminpage"
                  className='block px-3 py-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-md font-semibold transition-colors duration-200'
                  onClick={closeMobileMenu}
                >
                  <div className='flex items-center'>
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Admin Panel
                  </div>
                </Link>
              )}

              {/* User Section */}
              <div className='border-t border-yellow-200 pt-3 mt-3'>
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className='block px-3 py-2 text-gray-700 hover:text-black hover:bg-yellow-50 rounded-md font-medium transition-colors duration-200'
                      onClick={closeMobileMenu}
                    >
                      <div className='flex items-center'>
                        <User className='w-4 h-4 mr-2' />
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors duration-200'
                    >
                      <div className='flex items-center'>
                        <LogOut className='w-4 h-4 mr-2' />
                        Logout
                      </div>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/user/login"
                    className='block px-3 py-2 text-gray-700 hover:text-black hover:bg-yellow-50 rounded-md font-medium transition-colors duration-200'
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;