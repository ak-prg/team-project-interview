import {
  FREE_DELIVERY_FROM,
  DELIVERY_COST,
  PROMO_MIN_SUBTOTAL,
  PROMO_CODE,
  DISCOUNT_PERCENT,
} from '../../constants';

import type { CartItem, OrderTotal } from '../../types/cart.types';

export const calculateTotalAmount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + calculateTotalPrice(item), 0);

export const calculateTotalPrice = (item: CartItem): number => {
  return item.product.price * item.quantity;
};

export const getIncreasedQuantity = (item: CartItem): number =>
  item.quantity + 1;

export const getDecreasedQuantity = (item: CartItem): number =>
  item.quantity - 1;

export const calculateTotalQuantity = (items: CartItem[]): number => {
  return items.reduce((total, item: CartItem) => total + item.quantity, 0);
};

export const isInCart = (items: CartItem[], id: string): boolean =>
  items.some((item) => item.product.id === id);

export const formatPrice = (cents: number): string =>
  `${(cents / 100).toFixed(2)} BYN`;

export const validateQuantity = (quantity: number, stock: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= stock;
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
};

export const calculateOrderTotal = (
  items: CartItem[],
  promoCode: string
): OrderTotal => {
  const subtotal = calculateCartSubtotal(items);
  const delivery = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_COST;
  const discount =
    subtotal >= PROMO_MIN_SUBTOTAL && promoCode === PROMO_CODE
      ? Math.round(subtotal * (DISCOUNT_PERCENT / 100))
      : 0;
  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: subtotal - discount + delivery,
  };
};
