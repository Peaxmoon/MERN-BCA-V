import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        const products = data.products
        setProducts(products);
      // {console.log(products)}

      });
  }, []);

  return (
      //;./
      //  =] 7J/-<div style={{ padding: '20px' }}>
      //   <h1>🛒 Product List from DummyJSON</h1>
      //   <ul>
      //     {products.map(product => (
      //       <li key={product.id}>
      //         <h3>{product.title}</h3>
      //         <p>{product.description}</p>
      //         <strong>Price: ${product.price}</strong>
      //         <br />
      //         <img src={product.thumbnail} alt={product.title} width="150" />
      //       </li>
      //     ))}
      //   </ul>
      // </div>


    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    
    </div>
  );
}
