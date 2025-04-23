// src/pages/Login.jsx
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm'; // Ensure correct import

const Login = () => {
  // Effect for animated background
  useEffect(() => {
    // Create animated gradient effect
    const animateGradient = () => {
      const container = document.getElementById('gradient-container');
      if (!container) return;
      
      // Create gradient bubbles
      for (let i = 0; i < 6; i++) {
        const bubble = document.createElement('div');
        
        // Set random sizes between 200px and 500px
        const size = Math.floor(Math.random() * 300) + 200;
        
        // Random positions
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        
        // Apply styles
        bubble.className = 'gradient-bubble absolute rounded-full filter blur-3xl opacity-70';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        bubble.style.background = 'linear-gradient(45deg, #1e40af, #3b82f6, #60a5fa)';
        bubble.style.transform = 'translate(-50%, -50%)';
        
        // Random animation duration between 15 and 30 seconds
        const duration = Math.floor(Math.random() * 15) + 15;
        bubble.style.animation = `float ${duration}s ease-in-out infinite alternate`;
        
        container.appendChild(bubble);
      }
    };
    
    animateGradient();
    
    // Create the animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        50% {
          transform: translate(-60%, -40%) scale(1.1) rotate(5deg);
        }
        100% {
          transform: translate(-40%, -60%) scale(0.9) rotate(-5deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-blue-900 ">
      {/* Animated gradient background */}
      <div 
        id="gradient-container"
        className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 z-0 overflow-hidden"
      ></div>
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-50 z-10"></div>
      
      {/* Login form with glass effect */}
      <div className="relative z-20 backdrop-blur-md bg-white bg-opacity-10 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <LoginForm />
      </div>
      
      {/* Decorative electronics icons floating in background */}
      <div className="absolute bottom-6 left-6 text-white opacity-20 z-10">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div className="absolute top-10 right-10 text-white opacity-10 z-10">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
    </div>
    </div>
  );
};

export default Login;