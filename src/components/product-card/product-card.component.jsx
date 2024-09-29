import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.jsx";
import {
  Footer,
  ProductCartContainer,
  Name,
  Price,
} from "./product-card.styles";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);  
  const dispatch = useDispatch();
  const addProductToCart = () => dispatch(addItemToCart(cartItems,product));
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt="" />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to Cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
