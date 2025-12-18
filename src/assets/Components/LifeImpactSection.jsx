// src/Components/LifeImpactSection.jsx
import React from "react";

const benefits = [
  {
    title: "Expand Your Network",
    description:
      "Connect with like-minded people, meet new friends, and grow your professional and personal network.",
  },
  {
    title: "Improve Skills",
    description:
      "Participate in events and workshops to enhance your leadership, teamwork, and communication skills.",
  },
  {
    title: "Boost Confidence",
    description:
      "Engaging with clubs and taking initiatives builds your self-confidence and presentation skills.",
  },
  {
    title: "Stay Active & Engaged",
    description:
      "Clubs encourage participation in events and activities, keeping you active mentally and socially.",
  },
  {
    title: "Discover Your Passion",
    description:
      "Explore new hobbies, interests, and career paths by joining specialized clubs and activities.",
  },
  {
    title: "Community Impact",
    description:
      "Contribute to social causes, volunteer opportunities, and make a positive impact in your community.",
  },
];

const LifeImpactSection = () => {
  return (
    <section className="py-20 rounded-2xl mb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          How ClubSphere Can Impact Your Life
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-700 to-pink-600 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-200">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeImpactSection;
