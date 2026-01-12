// src/Components/TestimonialSection.jsx
import React from "react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Photography Club Member",
    feedback:
      "ClubSphere helped me discover an amazing photography club in my area. The events and community are truly inspiring.",
  },
  {
    name: "Nusrat Jahan",
    role: "Book Club Manager",
    feedback:
      "Managing my book club has never been easier. ClubSphere makes member and event management smooth and organized.",
  },
  {
    name: "Tanvir Hasan",
    role: "Tech Club Member",
    feedback:
      "Through ClubSphere, I joined multiple tech events and met professionals who helped me grow my career.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 rounded-2xl mb-8 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Community Says
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-700 to-pink-600 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <p className="text-gray-200 mb-6 leading-relaxed">
                “{item.feedback}”
              </p>

              <div className="border-t border-white/20 pt-4">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-300">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
