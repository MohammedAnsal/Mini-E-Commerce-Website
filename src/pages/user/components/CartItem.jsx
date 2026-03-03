const CartItem = ({ item, onInc, onDec, onRemove, stock = Infinity }) => {
  const price = parseFloat(item.price) || 0;

  return (
    <div className="flex items-center gap-3 p-2 border-b">
      <img
        src={item.imageURL || ""}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-600">₹{price.toFixed(2)}</div>
      </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDec(item.id)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <div className="w-6 text-center">{item.quantity}</div>
            <button
              onClick={() => onInc(item.id)}
              className={`px-2 py-1 rounded ${item.quantity >= stock ? 'bg-gray-300 text-gray-600' : 'bg-gray-200'}`}
              disabled={item.quantity >= stock}
            >
              +
            </button>
          </div>
          {Number.isFinite(stock) && item.quantity >= stock && (
            <div className="text-xs text-red-600 ml-2">Max reached</div>
          )}
      <div className="w-24 text-right">
        ₹{(price * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
