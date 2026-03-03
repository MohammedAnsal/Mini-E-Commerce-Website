import CartItem from "./CartItem";

const Cart = ({ items = [], products = [], onInc, onDec, onRemove, onClose }) => {
  const total = items.reduce(
    (s, it) => s + (parseFloat(it.price) || 0) * (it.quantity || 0),
    0,
  );

  return (
    <div className="fixed right-0 top-0 w-full sm:right-4 sm:top-16 sm:w-96 max-h-[80vh] bg-white shadow-lg rounded overflow-hidden flex flex-col z-50">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="font-semibold">
          Cart ({items.reduce((s, it) => s + it.quantity, 0)})
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="px-2 py-1 bg-gray-200 rounded">
            Close
          </button>
        </div>
      </div>
      <div className="overflow-auto p-2" style={{ maxHeight: "60vh" }}>
        {items.length === 0 ? (
          <div className="p-4 text-gray-600">Cart is empty</div>
        ) : (
          items.map((it) => {
            const prod = products.find((p) => p.id === it.productId);
            const stock = prod ? parseInt(prod.stock || "0", 10) : Infinity;
            return (
              <CartItem
                key={it.id}
                item={it}
                stock={stock}
                onInc={onInc}
                onDec={onDec}
                onRemove={onRemove}
              />
            );
          })
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Total</div>
          <div className="font-bold">₹{total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
