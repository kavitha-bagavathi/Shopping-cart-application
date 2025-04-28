import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { loadState, saveState } from './Localstorage';

const preloadedCartState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer

  },
  preloadedState: {
    cart: preloadedCartState|| { items: [], subtotal: 0, discount: 0, shipping: 0, total: 0 }
  }
});


store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;
