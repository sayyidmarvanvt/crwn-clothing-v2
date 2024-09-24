import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

// Action types for the cart reducer
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_OPEN: "SET_CART_OPEN",
};

// Cart reducer function to handle state changes
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_CART_OPEN:
      return { ...state, isCartOpen: payload };

    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`);
  }
};

// Initial state of the cart
const INITIAL_STATE = {
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
};

// Cart context to provide state and functions
export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

// Cart provider component with reducer logic
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartCount, cartTotal, cartItems } = state;

  // Update cart state with new items, count, and total
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (accu, cartItem) => accu + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (accu, cartItem) => accu + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  // Set cart open or closed state
  const setIsCartOpen = (isOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, isOpen));
  };

  // Add an item to the cart
  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  // Remove an item from the cart
  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  // Clear an item from the cart
  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  // Values provided by the context
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
