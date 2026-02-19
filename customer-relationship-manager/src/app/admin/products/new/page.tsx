"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = () => {
    console.log("New product:", { name, rating });

    // later connect API
    router.push("/admin/products");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Avg rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Product
      </button>
    </div>
  );
}