import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxois from "../../useAxois/useAxois";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ChackOut = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { logedInuser } = useAuth();
  const { id } = useParams();
  // console.log(id);
  const axoisInstece = useAxois();

  const { data } = useQuery({
    queryKey: ["studySession", id],
    queryFn: async () => {
      const res = await axoisInstece.get(`/study_session/${id}`);
      return res.data;
    },
  });

  const amount = parseInt(data?.registrationFee);
  const amountIncents = amount * 100;
  console.log(amountIncents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 1️⃣ Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error);
      return;
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // 2️⃣ Get clientSecret from server
    const res = await axoisInstece.post("/create-payment-intent", {
      amount: amountIncents,
      id,
    });
    const clientSecret = res.data.clientSecret;

    // 3️⃣ Confirm Card Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: logedInuser?.displayName,
          email: logedInuser?.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("✅ Payment succeeded!");

        const transactionId = result.paymentIntent.id;

        // 4️⃣ Book the session before saving payment
        try {
          await axoisInstece.post("/bookedSessions", {
            studentEmail: logedInuser?.email,
            sessionId: id,
            tutorEmail: data?.tutorEmail,
            sessionTitle: data?.sessionTitle,
            bookedAt: new Date(),
          });
        } catch (err) {
          console.log("Already booked or failed to book");
          toast.error("Already booked or failed to book");
        }

        // 5️⃣ Save Payment Data
        const paymentData = {
          id,
          email: logedInuser?.email,
          amount,
          transactionId: transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axoisInstece.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          // 6️⃣ Success Alert & Redirect
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Go to My Sessions",
          });

          navigate("/dashboard/view_booked_session");
        }
      }
    }
  };

  return (
    <form
      className="my-5 p-6 bg-white rounded-2xl shadow-lg  "
      onSubmit={handleSubmit}
    >
      <CardElement className="p-2 border rounded-2xl"></CardElement>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe}
      >
        pay ${amount}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
};

export default ChackOut;
