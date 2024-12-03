import { UnknownAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action: UnknownAction) => {
  if (setIsCartOpen.match(action))
    return { ...state, isCartOpen: action.payload };
  if (setCartItems.match(action))
    return { ...state, cartItems: action.payload };
  return state;
};
