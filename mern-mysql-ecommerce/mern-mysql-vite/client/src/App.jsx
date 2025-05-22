import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map(p => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
