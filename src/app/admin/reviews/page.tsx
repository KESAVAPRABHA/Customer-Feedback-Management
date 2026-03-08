import { reviews } from "../mock-data";
import ReviewTable from "../components/ReviewTable";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Reviews</h1>
      <ReviewTable reviews={reviews} />
    </div>
  );
}

