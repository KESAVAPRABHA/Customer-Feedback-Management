import Link from "next/link";
import { products } from "../mock-data";
import ProductTable from "../components/ProductTable";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Products</h1>

        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}