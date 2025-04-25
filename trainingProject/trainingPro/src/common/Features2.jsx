import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const FeaturedProductsWithTabs = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [products, setProducts] = useState({
    popular: [],
    newest: [],
    discounted: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=30');
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          // Popular: highest rated products
          const popular = [...data.products].sort((a, b) => b.rating - a.rating).slice(0, 4);
          
          // Newest: use the last items (simulating newest)
          const newest = [...data.products].slice(-4);
          
          // Discounted: products with discount
          const discounted = [...data.products]
            .filter(product => product.discountPercentage > 0)
            .sort((a, b) => b.discountPercentage - a.discountPercentage)
            .slice(0, 4);

          setProducts({
            popular,
            newest,
            discounted
          });
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const tabs = [
    { id: 'popular', label: 'Popular' },
    { id: 'newest', label: 'Newest' },
    { id: 'discounted', label: 'Best Deals' }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover our selection of top-rated, newest, and best deal products
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products[activeTab] && products[activeTab].length > 0 ? (
              products[activeTab].map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-4 text-center py-12 text-gray-500">
                No products found in this category.
              </div>
            )}
          </div>
        )}
        
        <div className="text-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center mx-auto">
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsWithTabs;