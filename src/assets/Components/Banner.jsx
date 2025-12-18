import React from "react";
import TextTypee from "./TextTypee";
import Clubs from "../Pages/Clubs";
import { Link } from "react-router";

// Gradient Button
const GradientButton = ({ children, hoverClass, Icon }) => (
  <button
    className={`
      px-6 py-3 font-semibold text-lg 
      bg-gradient-to-r from-purple-600 to-pink-600 
      text-white rounded-full 
      shadow-xl hover:shadow-purple-700/50 
      transition-all duration-300 ease-in-out 
      transform hover:scale-105 
      ${hoverClass}
      flex items-center justify-center space-x-2
    `}
  >
    {Icon && <span className="w-5 h-5">{Icon}</span>}
    <span>{children}</span>
  </button>
);

const Banner = () => {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d0b59] to-[#0f172a]"></div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-60 bg-purple-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-60 bg-pink-600/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto min-h-[600px] flex flex-col items-center justify-center text-center px-4 py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Unlock Your Club's
          </span>
          <br />
          Potential
        </h1>

        {/* Typing Text */}
        <div className="mt-4">
          <TextTypee />
        </div>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-purple-200 max-w-4xl font-light">
          ClubSphere is a modern and user-friendly platform to manage clubs,
          events, and managers effortlessly. Discover clubs, join events, or
          create your own community in one smart platform.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <Link to="/clubs">
            <GradientButton hoverClass="hover:from-blue-500 hover:to-indigo-500">
              Explore Clubs
            </GradientButton>
          </Link>

          <Link to="/events">
            <GradientButton hoverClass="hover:from-green-500 hover:to-teal-500">
              Explore Events
            </GradientButton>
          </Link>

          <Link to="/be-a-manager">
            <GradientButton hoverClass="hover:from-orange-500 hover:to-red-500">
              Be A Manager
            </GradientButton>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Banner;
