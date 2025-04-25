import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        
        // Option 1: Get products with highest ratings (popular products)
        // const response = await fetch('https://dummyjson.com/products?limit=8'); // Get 8 products
        // const data = await response.json();
        // const sortedByRating = data.products.sort((a, b) => b.rating - a.rating).slice(0, 4);
        // setFeaturedProducts(sortedByRating);
        
        // Option 2: Get random products
        const response = await fetch('https://dummyjson.com/products?limit=30'); // Get 30 products
        const data = await response.json();
        const randomProducts = [...data.products]
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, 4); // Get first 4 products
        
        setFeaturedProducts(randomProducts);
      } catch (err) {
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Early return for loading and error states
  if (loading) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredProducts.length === 0) {
    return null; // Don't show the section if there's an error or no products
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View All <span className="ml-1">→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;