import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductReview from '../../components/ProductReview';

function ProductDetails() {
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <div className="p-8">
    <h1 className="text-3xl font-bold">{product.title}</h1>
    <img src={product.thumbnail} alt={product.title} className="w-full max-w-md my-4" />
    <p className="text-lg">{product.description}</p>
    <p className="text-2xl font-bold">${product.price}</p>
    <p className="text-2xl font-bold">Ratin :- {product.rating} stars</p>
    <button className='bg-blue-600 text-white text-xl px-4 py-2 rounded-xl'>Add to cart</button>
    <ProductReview reviews={product.reviews} />
  </div>
  )
}

export default ProductDetails