// src/pages/NotFound.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after countdown
    if (countdown <= 0) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Number */}
        <h1 className="text-blue-600 text-9xl font-bold mb-2">404</h1>
        
        {/* Animated circuit lines */}
        <div className="relative h-12 mb-6">
          <div className="absolute w-full h-0.5 bg-blue-200 top-6 left-0">
            <div className="absolute w-3 h-3 rounded-full bg-blue-500 -top-1 animate-pulse" 
                 style={{left: '10%'}}></div>
            <div className="absolute w-3 h-3 rounded-full bg-blue-500 -top-1 animate-pulse" 
                 style={{left: '40%', animationDelay: '0.5s'}}></div>
            <div className="absolute w-3 h-3 rounded-full bg-blue-500 -top-1 animate-pulse" 
                 style={{left: '70%', animationDelay: '1s'}}></div>
          </div>
        </div>
        
        {/* Message */}
        <h2 className="text-blue-800 text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-blue-700 mb-8">
          Oops! It seems the electronic product you're looking for has been disconnected.
        </p>
        
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition hover:scale-105">
          <div className="flex justify-center mb-6">
            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-gray-600 mb-6">
            Don't worry! You'll be redirected to our homepage in <span className="font-bold text-blue-600">{countdown}</span> seconds.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            >
              Go Home Now
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-lg shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            >
              Go Back
            </button>
          </div>
        </div>
        
        {/* Search Suggestion */}
        <p className="text-blue-600 text-sm">
          Try searching for products or check out our featured electronics.
        </p>
      </div>
    </div>
  );
};

export default NotFound;