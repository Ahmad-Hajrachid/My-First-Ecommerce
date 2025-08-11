import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import CartTab from './CartTab'
import Footer from './Footer'
import { useSelector } from 'react-redux'

const Layout = () => {
  const statusTabCart = useSelector(store => store.cart.statusTab)
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100'>
      {/* Overlay when cart is open */}
      {statusTabCart && (
        <div className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden'></div>
      )}
      
      {/* Main Layout Container */}
      <div className={`min-h-screen flex flex-col transform transition-transform duration-500 ease-in-out
        ${statusTabCart === false ? "" : "lg:-translate-x-56"}`}>
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className='flex-1'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200/50 min-h-[600px]'>
              <div className='p-6 lg:p-8'>
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Cart Sidebar */}
      <CartTab />
    </div>
  )
}

export default Layout