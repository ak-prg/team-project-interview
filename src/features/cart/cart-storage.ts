import { CART_STORAGE_KEY } from '../../constants';
import type { CartItem } from '../../types/cart.types';

export function loadCart(): CartItem[] {
  try {
    const data = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage is full or unavailable
  }
}
