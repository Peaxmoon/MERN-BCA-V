import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import routes from '../routes/routeConfig'
import ProductSearch from './ProductSearch'
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const searchProducts = async (query = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load all products on initial render
  useEffect(() => {
    searchProducts();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span className="text-2xl font-bold text-blue-600">ElectroMart</span>
            </NavLink>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                {route.name}
                {route.path === '/cart' && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <ProductSearch onSearch={searchProducts} />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgEGB//EADIQAAICAQICCQMDBAMAAAAAAAABAgMEESESMQUTIjJBUVJhcRRCkYGhsTRicqIjU8H/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQAAAI7bYVRcpvRfyBIQXZVVW0pay8kUMjNst2hrCHtzZVAu2dIzb/44qPzuV5ZN8+9bL9NiIAeuTlzbb92ebgAdxtsjyskvhk0M66PN8XyVgBp1dIQltZFwftui3CcZxUotNPxRgnVdk6pcUJNMDeBTxs2NjUbOzN/hlwAAAAAAAHF1kaoOcnokBxk5EKK+KXN8o+ZkXWzulxTe/7IXWytsc5c/wCDgAAAAAAAAAAAAAAF7DzHFqu56x8JPw+SiAPoAZ+Bk8qZvf7WaAAAADJ6Qv623gi+zD92X8y3qaJSXeeyMYAAAAAAElVFlvcjqvPwLWHh8a47o9nwj5mikktEtEgM2HRs335xXxudvo1/9v8AqaAAyLMG6HJKa9is009GtH5H0BBkY1d8e0tJeElzAxgd3VSpnwT5+HucAAAATa5PR+Zs4l3XVKX3LZmMWcC3q70vtls//ANcHh6BmdJz1sjD0rUpEuVLjybH/dp+CIAAABYwaOut1fcju/f2K5rdH18GNF+MtwLKPQAAAAAACvmUddU9F21vFmOfQGNmw6vImlstdUBAAAATaeq5gAbtM+OqM/NanhX6OsX0+jfKTQAzJPik34ttngAAAADbxv6ev/FGIbODLixYey0AnAAAAAAAAMrpP+oX+JqmR0hNSyZafbsBWAAAAAT0W8EGvcEUYtrYAe3R4brF5SOCz0hDhyW/VuVgAAAF3o27hm65PaW6+SkE2mmtmgPoAVMPKVqUZvSz+S2AAAAA5nOMIuU2kkBzfYqqnN+HIxG3JuT5smy8h3z22guSIAAAAAAC9g08dLl/cC3hQ4MaC5arUAQ9J18VcZrnF6foZhvTipwcZLVNaMw7a3VNwlzTA5AAAAlhj22d2uXy1oBEW6c+yGimuNfO5z9DkehflD6HI9K/KAuRz6X3tYv3R087H9f+rKP0OR6F+UPocj0r8oCxZ0jHlXBv3lsUrrrLpa2S18kvAl+hyPSvyh9DkelflAVgTyw8iO7hqvZ6kMk4vSSafk1oB4AAB3RW7bYw9TODR6Mp0TufN7IC8uW2wPQAKfSFHWQ44Ltx8PNFwAfPnVdcrZqEFq3+xczsVxbtrXZfeS8Pcm6OVSp1i9Z/cB3j4ldSTfal5vw+CyAAAAAAAAAAOLK4WR0nFSXudgDJy8N0vjhvX+6KpvySaaa203MeVKnkuvH7S128kBzjUu+xRXd8WbUYqKSjslyRHj0RorUY7vxfmSgAAAAAAo34sq59bi7S8Yl4AVMfMjN8FnYs5aPxLZBfjV395aS9S5lfhy8buvrYLwAvgpw6Qrb4bE4SLMLa592cX8MDsAAAeNpc2l8kNmXRDnYn7LcCc4sshXHWbSRU+rtu2xqn/kxXhOcuPJm5y8lyA5lbbmvgpTjX9zLdFEKIaQW/i/MkilFaJJJeR6AAAAAAAAAAAAAAcTqrmu3BS+UVrMCjTWPFH4YAFO2DqekJzX6kanOXOcvyeAC3RiV26Obk/wBS1DDor5Vp/O56AJktNvI9AAAAAAAAAA//2Q==" //{user.image} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-blue-600 hover:text-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </NavLink>
            ))}
            <div className="px-3 py-2">
              <ProductSearch onSearch={searchProducts} />
            </div>
            <div className="flex flex-col space-y-2 px-3 py-2">
              <NavLink
                to="/login"
                className="text-center text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar