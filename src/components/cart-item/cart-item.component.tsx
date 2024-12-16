import { FC,memo } from "react";
import type { CartItem as TCart} from "../../store/cart/cart.types";

import { CartItemContainer, ItemDetails } from "./cart-item.styles";

type CartItemProps = {
  cartItem: TCart;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} className="" />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity}x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
