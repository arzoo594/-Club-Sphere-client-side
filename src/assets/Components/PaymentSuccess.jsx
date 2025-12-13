import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setTransactionId(res.data.transactionId);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="p-10 bg-white rounded-3xl shadow-2xl border border-green-100 text-center max-w-md mx-auto">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 border border-green-300 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
            ✓
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-green-700 mt-6 drop-shadow">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Your payment has been processed successfully.
        </p>

        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-500">Transaction Id </p>
          <p className="text-gray-800 font-semibold break-all">
            {transactionId}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:scale-[1.03] hover:shadow-lg transition-all"
        >
          Back to Home
        </button>

        <p className="mt-5 text-xs text-gray-400">
          Powered by{" "}
          <span className="font-semibold text-green-600">ClubSphere</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
