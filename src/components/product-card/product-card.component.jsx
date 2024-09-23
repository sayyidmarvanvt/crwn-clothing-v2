import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.jsx";
import { CartContext } from "../../context/cart.context";
import {
  Footer,
  ProductCartContainer,
  Name,
  Price,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
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
