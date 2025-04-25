import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductReview from '../../components/ProductReview';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
        <p className="mt-4 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  // Calculate discount percentage and original price
  const discountPercentage = product.discountPercentage ? 
    Math.round(product.discountPercentage) : null;
  
  const originalPrice = discountPercentage ? 
    Math.round(product.price / (1 - discountPercentage / 100)) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
            <a href={`/category/${product.category}`} className="hover:text-blue-600">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </a>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-700">{product.title}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-xl overflow-hidden shadow-md">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-full object-contain" 
            />
          </div>
          
          {/* Image Gallery */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              <div 
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === product.thumbnail ? 'border-blue-600' : 'border-transparent'}`}
                onClick={() => setSelectedImage(product.thumbnail)}
              >
                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              </div>
              
              {product.images.slice(0, 4).map((img, index) => (
                <div 
                  key={index} 
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-blue-600' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${product.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-blue-600 font-medium uppercase tracking-wider text-sm">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating} ({Math.floor(Math.random() * 300) + 50} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4">
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-blue-700">
                ${product.price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage && (
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-1 rounded">
                  Save {discountPercentage}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {product.stock > 0 ? (
                <>
                  <span className={`font-semibold ${product.stock < 10 ? 'text-orange-600' : 'text-green-600'}`}>
                    {product.stock < 10 ? 'Low stock' : 'In Stock'}
                  </span>
                  {' - '}{product.stock} items available
                </>
              ) : (
                <span className="font-semibold text-red-600">Out of stock</span>
              )}
            </p>
          </div>

          {/* Description */}
          <div className="mt-4 border-t border-b border-gray-200 py-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="pt-4 space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-3 py-1 text-gray-800 w-12 text-center">{quantity}</span>
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>Add to Cart</span>
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Product Details</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-800 capitalize">{product.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Brand</span>
                <span className="font-medium text-gray-800">{product.brand}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Item ID</span>
                <span className="font-medium text-gray-800">{product.id}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Product Images - Large View */}
      {product.images && product.images.length > 4 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">More Product Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.slice(4).map((img, index) => (
              <div key={index} className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={img} alt={`${product.title} - Image ${index + 5}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mock reviews data - since API doesn't provide reviews */}
      <ProductReview 
        reviews={[
          {
            reviewerName: "Sarah Johnson",
            rating: 5,
            comment: "This product exceeded my expectations! The quality is outstanding and it arrived earlier than expected.",
            date: "2023-12-15T12:30:00"
          },
          {
            reviewerName: "Michael Smith",
            rating: 4,
            comment: "Very good product overall. The only reason I didn't give it 5 stars is because of the packaging.",
            date: "2023-11-22T09:15:00"
          },
          {
            reviewerName: "Jessica Brown",
            rating: 4.5,
            comment: "I'm very happy with my purchase. The product works exactly as described and looks great!",
            date: "2023-10-30T14:45:00"
          }
        ]} 
      />
    </div>
  );
}

export default ProductDetails;