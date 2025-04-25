import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Login from '../auth/Login'
import Features from '../common/Features'
import About from '../common/About'
import Category from './Category'
import CategoryLinks from '../components/CategoryLinks'
import ProductSearch from '../components/ProductSearch'

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = async (query = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.products);
      console.log(products);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load all products on initial render
  useEffect(() => {
    searchProducts();
  }, []);

  return (
    <div>
      <CategoryLinks />
      <Features />
      <About />
    </div>
  )
}

export default Home