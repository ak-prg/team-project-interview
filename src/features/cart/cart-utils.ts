import type { CartItem } from '../../types/cart.types';

export const calculateTotalAmount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + calculateTotalPrice(item), 0);

export const calculateTotalPrice = (item: CartItem) => {
  return item.product.price * item.quantity;
};

export const getIncreasedQuantity = (item: CartItem) => item.quantity + 1;

export const getDecreasedQuantity = (item: CartItem) => item.quantity - 1;

export const calculateTotalQuantity = (items: CartItem[]) => {
  return items.reduce((total, item: CartItem) => total + item.quantity, 0);
};

export const isInCart = (items: CartItem[], id: string) =>
  items.some((item) => item.product.id === id);

export const formatPrice = (cents: number) => (cents / 100).toFixed(2);
