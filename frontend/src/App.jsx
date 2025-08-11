import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProductDetails from './pages/ProductDetails'
import Layout from './components/Layout'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PageNotFound from './pages/PageNotFound'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CheckOut from './pages/CheckOut'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes outside of Layout (no layout wrapper) */}
        <Route path='/user/login' element={<LoginPage/>}/>
        <Route path='/user/register' element={<RegisterPage/>}/>
        
        {/* Routes with Layout wrapper */}
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='products' element={<ProductsPage/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='/AdminPage' element={<AdminPage/>}/>
        </Route>
        <Route path='/checkout' element={<CheckOut/>}/>
        {/* Catch-all route for 404 - MUST be last */}
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App