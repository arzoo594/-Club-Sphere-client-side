// src/Components/FAQSection.jsx
import React, { useState } from "react";

const faqs = [
  {
    question: "Is ClubSphere free to use?",
    answer:
      "Yes, ClubSphere is free to browse and join free clubs. Some clubs may charge a membership or event fee.",
  },
  {
    question: "How do paid memberships work?",
    answer:
      "If a club requires a fee, payments are processed securely using Stripe before your membership is activated.",
  },
  {
    question: "Can I create and manage my own club?",
    answer:
      "Yes. You can request to become a Club Manager and create clubs, manage members, and host events.",
  },
  {
    question: "Are events open to non-members?",
    answer:
      "Some events may be public, but most events require an active club membership to register.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. ClubSphere uses Stripe in test/production mode to ensure secure and reliable payments.",
  },
  {
    question: "Can I cancel my membership?",
    answer:
      "Yes. You can manage or cancel your memberships anytime from your dashboard based on club policies.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 rounded-2xl mb-8 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] text-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl shadow-lg"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full text-left px-6 py-5 flex justify-between items-center"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="text-2xl font-bold">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-5 text-gray-200">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
