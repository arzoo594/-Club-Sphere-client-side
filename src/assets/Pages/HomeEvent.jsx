import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../Components/Loader";

const HomeEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // Take only 6 events
  const homeEvents = events.slice(0, 6);

  const filteredEvents = homeEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative rounded-2xl min-h-screen overflow-hidden my-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]" />
      <div className="absolute top-24 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full" />

      <div className="relative w-11/12 max-w-7xl mx-auto py-14">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10
          bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Upcoming Events
        </h2>

        {/* Search */}
        <div className="flex justify-center md:justify-end mb-10">
          <input
            type="text"
            placeholder="🔍 Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-5 py-3 rounded-full bg-white/10
            text-white placeholder-purple-300 border border-purple-600
            focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <p className="text-center text-purple-300">No events found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group bg-white/5 backdrop-blur-xl border border-purple-700/40
                rounded-2xl overflow-hidden shadow-xl
                hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      event.imageUrl || "https://via.placeholder.com/400x200"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {event.isRegistered && (
                    <span
                      className="absolute top-3 right-3 px-3 py-1 text-xs
                      bg-green-500 text-white rounded-full font-semibold"
                    >
                      Registered
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 text-purple-200">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-purple-300 mb-3">
                    Hosted by{" "}
                    <span className="font-semibold">{event.clubName}</span>
                  </p>

                  <div className="text-sm space-y-1 mb-4">
                    <p>📍 {event.location}</p>
                    <p>🗓 {new Date(event.eventDate).toLocaleDateString()}</p>
                    <p>👥 Max Attendees: {event.maxAttendees}</p>
                  </div>

                  <p className="text-sm text-purple-300 mb-5 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Button */}
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          to="/events"
          className="mt-10 text-center text-xl mx-auto block px-8 py-3 text-white font-semibold rounded-full
                     bg-gradient-to-r from-pink-500 to-purple-600
                     hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Upcoming Event
        </Link>
      </div>
    </div>
  );
};

export default HomeEvent;
