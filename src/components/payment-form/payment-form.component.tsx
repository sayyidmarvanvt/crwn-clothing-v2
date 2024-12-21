import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { log } from "console";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardDetails = elements.getElement(CardElement);

    // Validate if card details are provided
    if (!ifValidCardElement(cardDetails)) {
      alert("Please provide valid card details.");
      return;
    }

    // If everything is valid, proceed with the payment
    setIsProcessingPayment(true);

    try {
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      ).then((res) => res.json());

      const {
        paymentIntent: { client_secret },
      } = response;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardDetails,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
            email: currentUser ? currentUser.email : "guest@example.com",
            phone: "+1234567890",
            address: {
              line1: "1234 Elm St", // Dummy street address
              line2: "Apt 101", // Optional line 2
              city: "Sample City", // Dummy city
              state: "CA", // Dummy state
              postal_code: "41323", // Dummy postal code
              country: "US", // Dummy country
            },
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("Payment Successful");
        }
      }
    } catch (error) {
      alert("An error occurred while processing your payment.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      {currentUser ? (
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment: </h2>
          <CardElement />
          <PaymentButton
            type="button"
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            Pay now
          </PaymentButton>
        </FormContainer>
      ) : (
        <h2>Please log in to proceed with the payment.</h2>
      )}
    </PaymentFormContainer>
  );
};

export default PaymentForm;
