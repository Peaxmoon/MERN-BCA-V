// CategoryLinks.jsx
import { Link } from 'react-router-dom';

const categories = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Fragrances',
  'Mobile Accessories'
];

const formatForUrl = (name) => {
  // Convert to lowercase and replace spaces with hyphens
  return name.toLowerCase().replace(/\s+/g, '-');
};

const CategoryLinks = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${formatForUrl(category)}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryLinks;
