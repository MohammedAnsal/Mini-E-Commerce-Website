import ProductBtn from "./ProductBtn";

const ProductList = ({ products = [], onEdit, onDelete }) => {
  if (!products || products.length === 0) return <div>No products yet.</div>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1"> ₹{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1">{p.category}</td>
              <td className="border px-2 py-1">
                {p.imageURL ? (
                  <img
                    className="mx-auto"
                    src={p.imageURL}
                    alt={p.name}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="border px-2 py-1">
                <div className="flex gap-2 justify-center">
                  <ProductBtn onClick={() => onEdit && onEdit(p)}>
                    Edit
                  </ProductBtn>
                  <ProductBtn
                    onClick={() => onDelete && onDelete(p.id)}
                    className="bg-red-600"
                  >
                    Delete
                  </ProductBtn>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
