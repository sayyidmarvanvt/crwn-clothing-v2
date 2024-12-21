import React, { Suspense } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../utils/stripe/stripe.utils";

// Lazy load the PaymentForm component only when needed
const PaymentForm = React.lazy(
  () => import("../../components/payment-form/payment-form.component")
);

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>

      {/* Only load PaymentForm when needed */}
      <Suspense fallback={<div>Loading Payment...</div>}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Suspense>
    </CheckoutContainer>
  );
};

export default Checkout;
