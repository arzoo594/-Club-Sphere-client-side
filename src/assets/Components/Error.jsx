import React from "react";
import error from "../Images/error.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-72 lg:w-96">
        <Lottie animationData={error} loop={true} autoplay={true} />
      </div>

      <h2 className="text-2xl font-bold text-white mt-4">
        Oops! Page Not Found
      </h2>
      <Link
        to="/"
        className=" text-center text-xl mx-auto block px-8 py-3 text-white font-semibold rounded-full
                     bg-gradient-to-r from-pink-500 to-purple-600
                     hover:scale-105 hover:shadow-xl transition-transform duration-300 mt-4"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
