import { Product } from "@/api/product";

export interface AppState {
  traktorList: Product[];
  productId: number | null;
  product: Product | null;
}
