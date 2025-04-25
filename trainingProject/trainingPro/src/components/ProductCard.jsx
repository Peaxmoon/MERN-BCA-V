import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [showToast, setShowToast] = useState(false);
  
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1
      }
    });
    
    // Show toast feedback
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Calculate discount percentage if there's a discountPercentage property
  const discountPercentage = product.discountPercentage ? 
    Math.round(product.discountPercentage) : null;
  
  // Original price calculation for discounted items
  const originalPrice = discountPercentage ? 
    Math.round(product.price / (1 - discountPercentage / 100)) : null;

  return (
    <>
      <div className="bg-white border border-blue-100 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-blue-300 flex flex-col h-full group">
        {/* Product Image with Overlay */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          {/* Discount Badge */}
          {discountPercentage && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Stock Badge */}
          {product.stock <= 5 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              Low Stock
            </div>
          )}
          
          {/* Product Image */}
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="h-full h-48 object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-110" 
          />
          
          {/* Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
            <div className="p-4 w-full flex justify-between items-center">
              <button className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
              <button 
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-grow flex flex-col">
          {/* Category */}
          <div className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">
            {product.category || 'Electronics'}
          </div>
          
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {product.title}
          </h2>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.rating})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-700">${product.price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">${originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            {/* View Details Link */}
            <Link 
              to={`/product/${product.id}`} 
              className="mt-3 inline-block text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              View Details <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast 
        message="Item added to cart!"
        isVisible={showToast}
        type="success"
      />
    </>
  );
}

export default ProductCard;