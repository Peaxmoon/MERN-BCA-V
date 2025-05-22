function ProductList({ products }) {
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          {p.name} - ${p.price} - {p.mfgdate} - {p.brand}
          
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
