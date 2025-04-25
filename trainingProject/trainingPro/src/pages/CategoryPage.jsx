import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const formatTitle = (slug) => {
  if (!slug) return 'Unknown Category';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryName) {
      setLoading(false);
      setError('No category specified.');
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        const data = await response.json();
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{formatTitle(categoryName)}</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading products...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;