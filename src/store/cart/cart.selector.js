import { createSelector } from "reselect";

const selectCartSlice = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartSlice],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartSlice],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accu, cartItem) => accu + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0
  )
);
