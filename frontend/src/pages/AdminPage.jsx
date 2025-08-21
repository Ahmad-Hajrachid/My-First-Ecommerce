// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react'
import { Pencil, Trash, PlusCircle, Save, XCircle, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [products, setProducts] = useState([])
  const [isEditing, setIsEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'rings',
    material: 'gold',
    stock: 1,
    image: '',
    isActive: true
  })

  // Fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4444/api/products') // adjust API route
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4444/api/products', formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'rings',
        material: 'gold',
        stock: 1,
        image: '',
        isActive: true
      })
      fetchProducts()
      toast.success("Product Added Successfully")
    } catch (err) {
      console.error(err)
      toast.error("Failed to add product")
    }
  }

  // Edit product
  const handleEditProduct = async (id) => {
    try {
        const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4444/api/products/${id}`, formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      setIsEditing(null)
      fetchProducts()
      toast.success("Item Edited Successfully")
    } catch (err) {
      console.error(err)
      toast.error("Failed to edit product")
    }
  }

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4444/api/products/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        fetchProducts()
        toast.success("Item Deleted Successfully")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete product")
    }
  }

  // Mobile card component for products
  const ProductCard = ({ product }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      <div className="flex items-start gap-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{product.category} • {product.material}</p>
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
        </div>
        <div className="flex items-center gap-1">
          {product.isActive ? (
            <Eye className="w-4 h-4 text-green-600" />
          ) : (
            <EyeOff className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Stock: {product.stock}</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsEditing(product._id)
              setFormData(product)
            }}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 sm:space-y-12 p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto">
        {/* Header */}
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-base sm:text-lg text-gray-600">Manage your jewelry products here</p>
        </section>

        {/* Add Product */}
        <section className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> 
            <span className="truncate">Add New Product</span>
          </h2>
          <form className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6" onSubmit={handleAddProduct}>
            <input 
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Product Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <input 
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Image URL" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              className="w-full border border-gray-300 p-3 rounded-xl sm:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Product Description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3"
              required 
            />
            <input 
              type="number" 
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Price ($)" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Stock Quantity" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
            />
            
            <select 
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
            </select>
            <select 
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              name="material" 
              value={formData.material} 
              onChange={handleChange}
            >
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="rose-gold">Rose Gold</option>
            </select>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 p-2">
                <input 
                  type="checkbox" 
                  name="isActive" 
                  checked={formData.isActive} 
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Product is Active</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors sm:col-span-2 font-medium"
            >
              Add Product
            </button>
          </form>
        </section>

        {/* Product List */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">All Products ({products.length})</h2>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 font-semibold text-gray-900">Image</th>
                    <th className="p-4 font-semibold text-gray-900">Name</th>
                    <th className="p-4 font-semibold text-gray-900">Category</th>
                    <th className="p-4 font-semibold text-gray-900">Material</th>
                    <th className="p-4 font-semibold text-gray-900">Price</th>
                    <th className="p-4 font-semibold text-gray-900">Stock</th>
                    <th className="p-4 font-semibold text-gray-900">Status</th>
                    <th className="p-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      </td>
                      <td className="p-4 font-medium text-gray-900">{product.name}</td>
                      <td className="p-4 text-gray-600 capitalize">{product.category}</td>
                      <td className="p-4 text-gray-600 capitalize">{product.material}</td>
                      <td className="p-4 font-semibold text-gray-900">${product.price}</td>
                      <td className="p-4 text-gray-600">{product.stock}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setIsEditing(product._id)
                              setFormData(product)
                            }}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl sm:rounded-3xl border border-gray-200">
              <p className="text-gray-500">No products found. Add your first product above!</p>
            </div>
          )}
        </section>

        {/* Edit Product Form */}
        {isEditing && (
          <section className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Edit Product</h2>
            <form className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6" onSubmit={(e) => { e.preventDefault(); handleEditProduct(isEditing) }}>
              <input 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Product Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
              <input 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Image URL" 
                name="image" 
                value={formData.image} 
                onChange={handleChange} 
                required 
              />
              <textarea 
                className="w-full border border-gray-300 p-3 rounded-xl sm:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Product Description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="3"
                required 
              />
              <input 
                type="number" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Price ($)" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="number" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Stock Quantity" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
              />
              <select 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
              >
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bracelets">Bracelets</option>
              </select>
              <select 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                name="material" 
                value={formData.material} 
                onChange={handleChange}
              >
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="rose-gold">Rose Gold</option>
              </select>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 p-2">
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Product is Active</span>
                </label>
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit" 
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(null)} 
                  className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <XCircle className="w-4 h-4" /> Cancel
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}

export default AdminPage