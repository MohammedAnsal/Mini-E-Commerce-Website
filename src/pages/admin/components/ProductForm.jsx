import { useState, useEffect } from "react";
import ProductBtn from "./ProductBtn";

const blank = {
  id: "",
  name: "",
  price: "",
  stock: "",
  category: "",
  imageURL: "",
};

const ProductForm = ({ initialProduct = null, onSave, onCancel }) => {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialProduct) {
      setForm({ ...initialProduct });
    } else {
      setForm(blank);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.name || form.name.trim().length < 2) err.name = "Name required (min 2 chars)";
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) err.price = "Price must be a number > 0";
    const stock = parseInt(form.stock, 10);
    if (isNaN(stock) || stock < 0) err.stock = "Stock must be 0 or a positive integer";
    if (!form.category) err.category = "Category is required";
    if (!form.imageURL) err.imageURL = "Image URL must be provided";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const product = {
      id: form.id || String(Date.now()),
      name: form.name.trim(),
      price: String(parseFloat(form.price).toFixed(2)),
      stock: String(parseInt(form.stock, 10)),
      category: form.category,
      imageURL: form.imageURL.trim(),
    };
    onSave(product);
    setForm(blank);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 border rounded max-w-lg">
      <div className="mb-2">
        <label className="block text-sm">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full border p-1" />
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>

      <div className="mb-2">
        <label className="block text-sm">Price</label>
        <input name="price" value={form.price} onChange={handleChange} className="w-full border p-1" />
        {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
      </div>

      <div className="mb-2">
        <label className="block text-sm">Stock</label>
        <input name="stock" value={form.stock} onChange={handleChange} className="w-full border p-1" />
        {errors.stock && <div className="text-red-600 text-sm">{errors.stock}</div>}
      </div>

      <div className="mb-2">
        <label className="block text-sm">Category</label>
        <select name="category" value={form.category} onChange={handleChange} className="w-full border p-1">
          <option value="">-- select --</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Accessories">Accessories</option>
        </select>
        {errors.category && <div className="text-red-600 text-sm">{errors.category}</div>}
      </div>

      <div className="mb-2">
        <label className="block text-sm">Image URL</label>
        <input name="imageURL" value={form.imageURL} onChange={handleChange} className="w-full border p-1" />
        {errors.imageURL && <div className="text-red-600 text-sm">{errors.imageURL}</div>}
      </div>

      <div className="flex gap-2 mt-3">
        <ProductBtn type="submit">Save</ProductBtn>
        <ProductBtn type="button" onClick={() => { setForm(blank); onCancel && onCancel(); }} className="bg-gray-600">Cancel</ProductBtn>
      </div>
    </form>
  );
};

export default ProductForm;
