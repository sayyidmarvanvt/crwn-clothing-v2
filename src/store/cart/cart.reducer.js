import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },

    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// Helper functions for cart item operations
const findExistingCartItem = (cartItems, product) =>
  cartItems.find((cartItem) => cartItem.id === product.id);

const addCartItem = (cartItems, product) => {
  const existingCartItem = findExistingCartItem(cartItems, product);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, product) => {
  const existingCartItem = findExistingCartItem(cartItems, product);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return clearCartItem(cartItems, product);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, product) =>
  cartItems.filter((cartItem) => cartItem.id !== product.id);
