import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../../types/cart.types';
import type { Product } from '../../types/catalog.types';
import { validateQuantity } from './cart-utils';

const initialState: CartState = { items: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
      if (!validateQuantity(newQuantity, product.stock)) return;
      if (existingItem) {
        existingItem.quantity = newQuantity;
      } else {
        state.items.push({ product, quantity: newQuantity });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.product.id === id);
      if (
        itemToUpdate &&
        validateQuantity(quantity, itemToUpdate.product.stock)
      ) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
