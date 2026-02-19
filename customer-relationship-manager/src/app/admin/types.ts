export interface Product {
  id: number;
  name: string;
  description?: string;
  avgRating: number;
}

export interface Review {
  id: number;
  productId: number;
  product: string;
  rating: number;
  message: string;
  status: "New" | "In Progress" | "Resolved";
}