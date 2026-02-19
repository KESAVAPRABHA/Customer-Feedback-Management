"use client";
import { Product } from "../types";

export default function ProductTable({ products }: { products: Product[] }) {
  const deleteProduct = (id: number) => {
    console.log("delete", id);
  };

  return (
    <div className="bg-white rounded shadow">
      {products.map((p) => (
        <div
          key={p.id}
          className="p-4 border-b flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">⭐ {p.avgRating}</p>
          </div>

          <button
            onClick={() => deleteProduct(p.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}