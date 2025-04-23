  const Button = ({ children, type = "button", fullWidth = false, onClick }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${fullWidth ? 'w-full' : ''} flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;