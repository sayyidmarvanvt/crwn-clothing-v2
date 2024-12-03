import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  // Handle the case where the stripe key is missing, maybe throw an error
  throw new Error("Stripe publishable key is missing");
}

export const stripePromise = loadStripe(stripeKey);
