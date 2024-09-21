import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl } = cartItem;
  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}</span>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default CartItem;
