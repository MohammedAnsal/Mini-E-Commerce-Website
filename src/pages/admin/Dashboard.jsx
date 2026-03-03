import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductBtn from "./components/ProductBtn";

const STORAGE_KEY = "products";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        console.log(raw)
      if (raw) setProducts(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load products from storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.log("Failed to save products", error);
    }
  }, [products]);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p)),
      );
    } else {
      setProducts((prev) => [product, ...prev]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen" >
      <h1 className="text-2xl font-bold mb-4">Welcome Admin Dashboard</h1>

      <div className="mb-4">
        <ProductBtn onClick={handleAddClick}>Add Product</ProductBtn>
      </div>

      {showForm && (
        <ProductForm
          initialProduct={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
