import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_OPEN,
  boolean
>;

// Set cart open or closed state
export const setIsCartOpen = withMatcher(
  (isOpen: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_CART_OPEN, isOpen)
);

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

// Add an item to the cart
export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): SetCartItems => setCartItems(addCartItem(cartItems, productToAdd));

// Remove an item from the cart
export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
): SetCartItems => setCartItems(removeCartItem(cartItems, productToRemove));

// Clear an item from the cart
export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
): SetCartItems => setCartItems(clearCartItem(cartItems, productToClear));

// Helper functions for cart item operations
const findExistingCartItem = (cartItems: CartItem[], product: CategoryItem) =>
  cartItems.find((cartItem: CartItem) => cartItem.id === product.id);

const addCartItem = (cartItems: CartItem[], product: CategoryItem) => {
  const existingCartItem = findExistingCartItem(cartItems, product);

  if (existingCartItem) {
    return cartItems.map((cartItem: CartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], product: CartItem) => {
  const existingCartItem = findExistingCartItem(cartItems, product);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return clearCartItem(cartItems, product);
  }

  return cartItems.map((cartItem: CartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], product: CartItem) =>
  cartItems.filter((cartItem: CartItem) => cartItem.id !== product.id);
