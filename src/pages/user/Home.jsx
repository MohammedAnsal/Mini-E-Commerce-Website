import { useEffect, useState } from "react";
import Cart from "./components/Cart";

const STORAGE_KEY = import.meta.env.STORAGE_KEY || "products";
const CART_KEY = import.meta.env.CART_KEY || "cart";

const Home = () => {
  // Products and Cart state management :-

  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProducts(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load products", e);
    }
  }, []);

  const saveCart = (updater) => {
    setCart((prev) => {
      const newCart = typeof updater === "function" ? updater(prev) : updater;
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      } catch (e) {
        console.warn("Failed to save cart", e);
      }
      return newCart;
    });
  };

  //  Add to cart section :-

  const addToCart = (product) => {
    saveCart((prev) => {
      const found = prev.find((it) => it.productId === product.id);
      if (found) {
        // item already present, do nothing
        return prev;
      }
      const stock = parseInt(product.stock || "0", 10);
      if (stock && stock <= 0) return prev; // out of stock
      const item = {
        id: String(Date.now()) + Math.random().toString(36).slice(2, 7),
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        quantity: 1,
        imageURL: product.imageURL || "",
      };
      return [item, ...prev];
    });
    setShowCart(true);
  };

  //  Cart item increment and decrement section :-

  const inc = (id) => {
    saveCart((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const product = products.find((p) => p.id === it.productId);
        const stock = parseInt(product?.stock || "0", 10);
        if (stock && it.quantity >= stock) return it;
        return { ...it, quantity: it.quantity + 1 };
      }),
    );
  };

  const dec = (id) => {
    saveCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it))
        .filter((it) => it.quantity > 0),
    );
  };

  //  Remove item from cart section :-

  const remove = (id) => {
    saveCart((prev) => prev.filter((it) => it.id !== id));
  };

  //   Products based on search and category :-

  const filtered = products.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? p.category === category : true;
    return matchesQuery && matchesCategory;
  });

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean)),
  );

  // number of unique products in cart
  const cartCount = cart.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">Cart: {cartCount}</div>
          <button
            onClick={() => setShowCart((s) => !s)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            View Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          aria-label="Search products"
          className="flex-1 p-2 border rounded"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full sm:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-gray-600">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const cartItem = cart.find((c) => c.productId === p.id);
            const cartQty = cartItem ? cartItem.quantity : 0;
            const stock = parseInt(p.stock || "0", 10);
            const disableAdd = stock && cartQty >= stock;

            return (
            <div
              key={p.id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <div className="h-40 mb-3 bg-gray-100 rounded overflow-hidden">
                <img
                  src={p.imageURL || placeholder}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <div className="text-gray-600 mt-1">₹{p.price}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Category: {p.category || "-"}
                </div>
                <div className="text-sm text-gray-500">Stock: {p.stock}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => addToCart(p)}
                  className={`flex-1 px-3 py-2 rounded text-white ${disableAdd ? 'bg-gray-400' : 'bg-indigo-600'}`}
                  disabled={disableAdd}
                >
                  Add to Cart
                </button>
                {disableAdd && (
                  <div className="text-xs text-red-600 mt-1">Max in cart</div>
                )}
              </div>
            </div>
          )})}
        </div>
      )}

      {showCart && (
        <Cart
          items={cart}
          products={products}
          onInc={(id) => inc(id)}
          onDec={(id) => dec(id)}
          onRemove={(id) => remove(id)}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

export default Home;
