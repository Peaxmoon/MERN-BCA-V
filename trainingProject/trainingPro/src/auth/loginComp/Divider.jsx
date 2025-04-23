
  
  // src/components/common/Divider/Divider.jsx
  const Divider = ({ text }) => {
    return (
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        {text && (
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{text}</span>
          </div>
        )}
      </div>
    );
  };
  
  export default Divider;