import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

// Set cart open or closed state
export const setIsCartOpen = (isOpen) =>
  createAction(CART_ACTION_TYPES.SET_CART_OPEN, isOpen);

// Add an item to the cart
export const addItemToCart = (cartItems, productToAdd) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    addCartItem(cartItems, productToAdd)
  );

// Remove an item from the cart
export const removeItemFromCart = (cartItems, productToRemove) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    removeCartItem(cartItems, productToRemove)
  );

// Clear an item from the cart
export const clearItemFromCart = (cartItems, productToClear) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    clearCartItem(cartItems, productToClear)
  );

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
