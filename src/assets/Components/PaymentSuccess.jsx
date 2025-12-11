import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id"); // <-- Stripe থেকে আসবে
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("Payment Success Response:", res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="p-8 bg-white rounded-xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mt-3">
          আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
        </p>
        <p className="mt-2 text-gray-800 font-semibold">
          Session ID: {sessionId}
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
