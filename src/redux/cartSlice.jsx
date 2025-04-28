

import { createSlice } from '@reduxjs/toolkit';

const calculateCartTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = items.reduce(
    (sum, item) => sum + (item.price * item.discountPercentage / 100) * item.quantity,
    0
  );

  let shipping = 0;
  if (subtotal > 200) {
    shipping = 0;
  } else if (subtotal > 100) {
    shipping = 20;
  } else {
    shipping = 50;
  }

  const total = subtotal - discount + shipping;

  return { subtotal, discount, shipping, total };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      Object.assign(state, calculateCartTotals(state.items));
    },
    removeFromCart: (state, action) => {
        
      state.items = state.items.filter(item => item.id !== action.payload);
      Object.assign(state, calculateCartTotals(state.items));
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      Object.assign(state, calculateCartTotals(state.items));
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      Object.assign(state, calculateCartTotals(state.items));
    }
  }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
