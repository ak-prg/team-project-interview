import {
  FREE_DELIVERY_FROM,
  DELIVERY_COST,
  PROMO_MIN_SUBTOTAL,
  PROMO_CODE,
  DISCOUNT_PERCENT,
} from '../../constants';

import type { CartItem, OrderTotal } from '../../types/cart.types';

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

export const validateQuantity = (quantity: number, stock: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= stock;
};

export const canIncreaseQuantity = (item: CartItem): boolean =>
  validateQuantity(getIncreasedQuantity(item), item.product.stock);

export const isInCart = (items: CartItem[], id: string): boolean =>
  items.some((item) => item.product.id === id);

export const formatPrice = (cents: number): string =>
  `${(cents / 100).toFixed(2)} BYN`;

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => {
    return acc + calculateTotalPrice(item);
  }, 0);
};

export const calculateDeliveryCosts = (
  items: CartItem[],
  subtotal: number
): number => {
  return items.length === 0 || subtotal >= FREE_DELIVERY_FROM
    ? 0
    : DELIVERY_COST;
};

export const isPromoCodeValid = (promoCode: string): boolean =>
  promoCode.trim().toUpperCase() === PROMO_CODE;

export const calculateDiscount = (
  promoCode: string,
  subtotal: number
): number => {
  return subtotal >= PROMO_MIN_SUBTOTAL && isPromoCodeValid(promoCode)
    ? Math.round(subtotal * (DISCOUNT_PERCENT / 100))
    : 0;
};

export const calculateOrderTotal = (
  items: CartItem[],
  promoCode: string
): OrderTotal => {
  const subtotal = calculateCartSubtotal(items);
  const delivery = calculateDeliveryCosts(items, subtotal);
  const discount = calculateDiscount(promoCode, subtotal);

  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: subtotal - discount + delivery,
  };
};
