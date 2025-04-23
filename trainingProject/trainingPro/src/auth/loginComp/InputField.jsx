// src/components/common/Input/InputField.jsx
const InputField = ({ id, type, placeholder, value, onChange, required }) => {
    return (
      <div className="relative">
        <input
          type={type || "text"}
          id={id}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  };
  
  export default InputField;