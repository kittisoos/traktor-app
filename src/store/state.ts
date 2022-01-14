import { Product } from "@/api/product";
import { Comment } from "@/api/comments";

export interface AppState {
  traktorList: Product[];
  productId: number | null;
  product: Product | null;
  commentList: Comment[];
}
