const ProductBtn = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md font-medium text-white shadow-sm hover:opacity-95 focus:outline-none ${className || 'bg-blue-600'}`}>
      {children}
    </button>
  );
};

export default ProductBtn;
