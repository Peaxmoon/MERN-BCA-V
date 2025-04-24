// CategoryLinks.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryLinks = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedCategories = ['mobile-accessories', 'laptops', 'smartphones', 'tablets', 'fragrances'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();

        // Handle both slug-only array and full object array
        let categoriesData;

        if (Array.isArray(data) && typeof data[0] === 'string') {
          // If API returns slug array (e.g. ["smartphones", "laptops"])
          categoriesData = data
            .filter((slug) => selectedCategories.includes(slug))
            .map((slug) => ({ slug, name: slug.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) }));
        } else {
          // If API returns array of objects with { slug, name }
          categoriesData = data.filter((category) =>
            selectedCategories.includes(category.slug)
          );
        }

        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryLinks;
