// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react'
import { Pencil, Trash, PlusCircle, Save, XCircle } from 'lucide-react'
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
    } catch (err) {
      console.error(err)
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
    }
  }

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      window.confirm("Are you sure you want to delete this product?")
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4444/api/products/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      fetchProducts()
      toast.success("Item Deleted Successfully")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-16 p-6 lg:p-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your jewelry products here</p>
      </section>

      {/* Add Product */}
      <section className="bg-gray-50 p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-600" /> Add New Product
        </h2>
        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleAddProduct}>
          <input className="border p-3 rounded-xl" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
          <input className="border p-3 rounded-xl" placeholder="Image URL" name="image" value={formData.image} onChange={handleChange} required />
          <textarea className="border p-3 rounded-xl md:col-span-2" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required />
          <input type="number" className="border p-3 rounded-xl" placeholder="Price" name="price" value={formData.price} onChange={handleChange} required />
          <input type="number" className="border p-3 rounded-xl" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
          
          <select className="border p-3 rounded-xl" name="category" value={formData.category} onChange={handleChange}>
            <option value="rings">Rings</option>
            <option value="necklaces">Necklaces</option>
            <option value="earrings">Earrings</option>
            <option value="bracelets">Bracelets</option>
          </select>
          <select className="border p-3 rounded-xl" name="material" value={formData.material} onChange={handleChange}>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="rose-gold">Rose Gold</option>
          </select>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /> Active
          </label>

          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors md:col-span-2">
            Add Product
          </button>
        </form>
      </section>

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="overflow-x-auto bg-white rounded-3xl shadow border border-gray-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Material</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Active</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.material}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">{product.isActive ? 'Yes' : 'No'}</td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => {
                        setIsEditing(product._id)
                        setFormData(product)
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edit Product Form */}
      {isEditing && (
        <section className="bg-gray-50 p-6 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); handleEditProduct(isEditing) }}>
            <input className="border p-3 rounded-xl" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
            <input className="border p-3 rounded-xl" placeholder="Image URL" name="image" value={formData.image} onChange={handleChange} required />
            <textarea className="border p-3 rounded-xl md:col-span-2" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required />
            <input type="number" className="border p-3 rounded-xl" placeholder="Price" name="price" value={formData.price} onChange={handleChange} required />
            <input type="number" className="border p-3 rounded-xl" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
            <select className="border p-3 rounded-xl" name="category" value={formData.category} onChange={handleChange}>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
            </select>
            <select className="border p-3 rounded-xl" name="material" value={formData.material} onChange={handleChange}>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="rose-gold">Rose Gold</option>
            </select>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /> Active
            </label>
            <div className="flex gap-4 md:col-span-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2" >
                <Save className="w-4 h-4" /> Save
              </button>
              <button type="button" onClick={() => setIsEditing(null)} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 transition-colors flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  )
}

export default AdminPage
