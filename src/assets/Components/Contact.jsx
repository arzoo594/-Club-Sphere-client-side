// src/Pages/ContactPage.jsx
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: connect to API or email service
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="relative py-20 my-8 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] text-white min-h-screen">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] -z-10"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full -z-10"></div>

      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
        <p className="text-gray-300 text-center mb-12">
          Have a question, suggestion, or want to join a club? Send us a message
          and we'll get back to you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 p-8 rounded-2xl shadow-xl flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-5 py-3 rounded-full bg-white/10 text-white placeholder-purple-300 border border-purple-600
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-5 py-3 rounded-full bg-white/10 text-white placeholder-purple-300 border border-purple-600
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="px-5 py-3 rounded-full bg-white/10 text-white placeholder-purple-300 border border-purple-600
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="px-5 py-3 rounded-2xl bg-white/10 text-white placeholder-purple-300 border border-purple-600
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
          ></textarea>

          <button
            type="submit"
            className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600
                       text-white font-semibold hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Send Message
          </button>

          {submitted && (
            <p className="mt-4 text-green-400 font-semibold text-center">
              Thank you! Your message has been sent.
            </p>
          )}
        </form>

        {/* Optional Contact Info */}
        <div className="mt-12 text-center text-gray-300 space-y-2">
          <p>📧 Email: arzooahmed0170609@gmail.com</p>
          <p>📞 Phone: +880 170 609 7788</p>
          <p>📍 Location: Dhaka, Bangladesh</p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
