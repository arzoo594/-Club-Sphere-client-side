import React, { useState } from "react";

// Sample static data with working image URLs
const events = [
  {
    _id: 1,
    title: "Tech Innovators Meetup",
    clubName: "Tech Club",
    location: "Dhaka",
    eventDate: "2025-01-20",
    imageUrl: "https://i.ibb.co/rKq7hhb7/image.png",
  },
  {
    _id: 2,
    title: "Cultural Night",
    clubName: "Cultural Club",
    location: "Chittagong",
    eventDate: "2025-02-15",
    imageUrl: "https://i.ibb.co/bgcpC5Wz/image.png",
  },
  {
    _id: 3,
    title: "Gaming Tournament",
    clubName: "Gaming Club",
    location: "Dhaka",
    eventDate: "2025-03-05",
    imageUrl: "https://i.ibb.co/bgrp40PJ/image.png",
  },
  {
    _id: 4,
    title: "Sports Fest",
    clubName: "Sports Club",
    location: "Khulna",
    eventDate: "2025-04-10",
    imageUrl: "https://i.ibb.co/JFsFTtGq/image.png",
  },
  {
    _id: 5,
    title: "Volunteer Day",
    clubName: "Social Club",
    location: "Rajshahi",
    eventDate: "2025-05-12",
    imageUrl: "https://i.ibb.co/6BzQjqF/image.png", // fixed
  },
  {
    _id: 6,
    title: "Music Night",
    clubName: "Cultural Club",
    location: "Sylhet",
    eventDate: "2025-06-18",
    imageUrl: "https://i.ibb.co/JXCBc5t/image.png",
  },
];

const HomeEventSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-11/12 max-w-6xl mx-auto py-12">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-purple-400">
        Upcoming Events
      </h2>

      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Slides */}
        {events.map((event, index) => (
          <div
            key={event._id}
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-64 object-cover rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <p className="text-sm">Hosted by {event.clubName}</p>
              <p className="text-sm">
                📍 {event.location} | 🗓{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-purple-600/50 p-3 rounded-full text-white hover:bg-purple-700 transition"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-purple-600/50 p-3 rounded-full text-white hover:bg-purple-700 transition"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {events.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              idx === currentIndex ? "bg-purple-500" : "bg-purple-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HomeEventSlider;
