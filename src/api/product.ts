import axios from "axios";
import { base_url } from "@/config/api";

axios.defaults.baseURL = base_url;

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export async function getProducts() {
  const res = await axios.get<Product[]>("/products");
  return res.data;
}

export async function getProductById(id: number) {
  const res = await axios.get<Product>(`/products/${id}`);
  return res.data;
}
