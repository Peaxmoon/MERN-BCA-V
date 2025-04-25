import React from 'react';

const Toast = ({ message, isVisible, type = 'success' }) => {
  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out`}>
      {message}
    </div>
  );
};

export default Toast;
