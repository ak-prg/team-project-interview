import type { Product } from './catalog.types';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartItemRowProps = {
  item: CartItem;
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
};

export type OrderTotal = {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};
