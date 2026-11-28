import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import { loadCart, saveCart } from './features/cart/cart-storage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: { items: loadCart() },
  },
});

store.subscribe(() => {
  saveCart(store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
