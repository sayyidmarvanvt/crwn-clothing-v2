import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return { ...state, cartCount: payload };
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return { ...state, cartTotal: payload };

    default:
      return state;
  }
};
