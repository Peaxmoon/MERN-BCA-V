  
  // src/components/common/Input/CheckboxField.jsx
  const CheckboxField = ({ id, label, checked, onChange }) => {
    return (
      <div className="flex items-center">
        <input
          id={id}
          name={id}
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700 cursor-pointer">
          {label}
        </label>
      </div>
    );
  };
  
  export default CheckboxField;