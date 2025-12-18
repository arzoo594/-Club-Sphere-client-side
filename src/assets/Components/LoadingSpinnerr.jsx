import React from "react";
import Lottie from "lottie-react";
import loadingspinnerr from "../Images/loadingspinner.json";

const LoadingSpinnerr = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(168, 85, 247, 0.15), transparent 40%),
          radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.15), transparent 40%),
          linear-gradient(135deg, #0f172a, #1a0033, #2d0b59)
        `,
      }}
    >
      <div className="w-64 md:w-80 lg:w-96 flex flex-col items-center">
        <Lottie animationData={loadingspinnerr} loop={true} autoplay={true} />

        <p className="text-center mt-6 text-purple-300 font-bold tracking-[0.3em] animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinnerr;
