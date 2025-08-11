import React from 'react'
import { Link } from 'react-router'
import { AlertCircle, ArrowLeft } from 'lucide-react'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-yellow-500 to-white text-white px-4">
      <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-12 max-w-md text-center shadow-lg">
        <AlertCircle className="mx-auto w-20 h-20 text-amber-400 mb-6" />
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-blue-100 mb-8">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound