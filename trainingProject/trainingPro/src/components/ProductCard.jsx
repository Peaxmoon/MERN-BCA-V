import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
    </div>
  )
}

export default ProductCard