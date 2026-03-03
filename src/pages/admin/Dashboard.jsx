import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductBtn from "./components/ProductBtn";
import { toast } from "sonner";

const STORAGE_KEY = import.meta.env.STORAGE_KEY || "products";

const Dashboard = () => {
  const [products, setProducts] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const legacy = localStorage.getItem("products");
        if (legacy) {
          raw = legacy;
          localStorage.setItem(STORAGE_KEY, legacy);
          localStorage.removeItem("products");
        }
      }
      if (raw) {
        setProducts(JSON.parse(raw));
      }
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

  //   Add, Edit, Delete Functions :-

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.warn("Failed to save products", e);
    }
  };

  const handleSave = (product) => {
    let updated;
    const isEdit = Boolean(editingProduct);
    if (isEdit) {
      updated = products.map((p) => (p.id === product.id ? product : p));
    } else {
      updated = [product, ...products];
    }
    saveProducts(updated);
    setShowForm(false);
    setEditingProduct(null);
    toast.success(isEdit ? "Product updated" : "Product added");
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    toast.success("Product deleted");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
