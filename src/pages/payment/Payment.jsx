import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import ChackOut from "./ChackOut";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_payment_secrte);
  return (
    <Elements stripe={stripePromise}>
      <ChackOut></ChackOut>
    </Elements>
  );
};

export default Payment;
