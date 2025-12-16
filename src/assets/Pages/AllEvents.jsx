import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

const AllEvents = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/club-eventss")
      .then((res) => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <Loader />;

  if (events.length === 0)
    return <p className="text-center mt-16 text-purple-300">No events found</p>;

  return (
    <div className="relative min-h-screen overflow-hidden my-">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full" />

      <div className="relative w-11/12 max-w-7xl mx-auto py-14">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-12
          bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Explore All Events
        </h2>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="group bg-white/5 backdrop-blur-xl border border-purple-700/40
              rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03]
              hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.imageUrl || "https://via.placeholder.com/400x200"}
                  alt={event.title}
                  className="w-full h-full object-cover
                  group-hover:scale-110 transition duration-500"
                />

                <span
                  className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold
                  rounded-full bg-purple-500/80 text-white"
                >
                  {event.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 text-purple-200 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-1">
                  {event.title}
                </h3>

                <p className="text-sm text-purple-300 mb-3">
                  Hosted by{" "}
                  <span className="font-semibold">{event.clubName}</span>
                </p>

                <div className="text-sm space-y-1 flex-1">
                  <p>📍 {event.location}</p>
                  <p>🗓 {new Date(event.eventDate).toLocaleDateString()}</p>
                  <p>👥 Max Attendees: {event.maxAttendees}</p>
                  <p>👤 Created by: {event.createdBy}</p>
                </div>

                {/* Button */}
                <button
                  className="mt-5 w-full py-2 rounded-full font-semibold text-white
                  bg-gradient-to-r from-pink-500 to-purple-600
                  hover:scale-105 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
