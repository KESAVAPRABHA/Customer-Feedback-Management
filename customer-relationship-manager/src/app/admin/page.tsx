import MetricCard from "./components/MetricCard";
import { products, reviews } from "./mock-data";

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <MetricCard title="Products" value={products.length} />
      <MetricCard title="Reviews" value={reviews.length} />
      <MetricCard title="Avg Rating" value="4.2" />
      <MetricCard title="Pending" value="1" />
    </div>
  );
}