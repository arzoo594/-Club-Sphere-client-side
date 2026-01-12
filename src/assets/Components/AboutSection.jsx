import React from "react";
import { Link } from "react-router";

const AboutSection = () => {
  return (
    <section className="relative py-20 my-8 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] text-white rounded-2xl mb-8">
      {/* Decorative Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/20 blur-3xl rounded-full -z-10"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6">About ClubSphere</h2>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-6">
          ClubSphere is a platform designed to help people discover, join, and
          manage local clubs. Whether you're interested in photography, tech,
          sports, or hobbies, ClubSphere brings your community closer and makes
          participation simple and fun.
        </p>

        <p className="text-gray-300 text-lg mb-8">
          Our mission is to empower members to connect, learn, and grow through
          club activities and events. Club managers can easily create and manage
          clubs, organize events, and engage with their members. Admins oversee
          the platform to ensure smooth operations.
        </p>

        {/* CTA Button */}
        <Link
          to="/clubs"
          className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold
                     text-white rounded-full bg-gradient-to-r from-pink-500 to-purple-600
                     hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Explore Clubs
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
