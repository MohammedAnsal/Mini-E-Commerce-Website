import React from "react";

const ProductBtn = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button type={type} onClick={onClick} className={`px-3 py-1 rounded bg-blue-600 text-white ${className}`}>
      {children}
    </button>
  );
};

export default ProductBtn;
