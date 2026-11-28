import type { Category } from '../constants';

export interface Product {
  id: string;
  key: string;
  partNumber: string;
  origNumber: string;
  name: string;
  producer: string;
  category: Category;
  images: string[];
  price: number;
  stock: number;
}
