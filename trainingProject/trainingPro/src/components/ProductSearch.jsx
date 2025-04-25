import { useState } from 'react';

function ProductSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    console.log(query);
    // console.log(searchProducts);
  };

  return (
    <div className="flex items-center pl-[10%]">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="flex-grow p-3 border text-black border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded shadow transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default ProductSearch;