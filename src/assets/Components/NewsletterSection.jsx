// src/Components/NewsletterSection.jsx
import React, { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // For now static, later can connect to API
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 rounded-2xl mb-8 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6">
          Stay Updated with ClubSphere
        </h2>

        <p className="text-gray-300 mb-10">
          Subscribe to our newsletter and never miss out on upcoming clubs and
          events.
        </p>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-5 py-3 rounded-full w-full sm:w-72 bg-white/10 text-white placeholder-purple-300 border border-purple-600
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600
                       text-white font-semibold hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Subscribe
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <p className="mt-6 text-green-400 font-semibold">
            Thank you for subscribing!
          </p>
        )}

        {/* Decorative Gradient Blur */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full -z-10"></div>
      </div>
    </section>
  );
};

export default NewsletterSection;
