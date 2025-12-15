import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch events
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading events...</p>;
  if (isError)
    return <p className="text-center mt-10">Error: {error.message}</p>;

  // 🔹 Register handler
  const handleRegister = async (eventId) => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login required",
        text: "Please login first to register",
      });
    }

    try {
      await axiosSecure.post("/event-registration", {
        eventId,
        userEmail: user.email,
      });

      Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "You have successfully registered for this event",
      });

      queryClient.invalidateQueries(["events"]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Registration failed",
      });
    }
  };

  // 🔹 Filter events by search term
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
        Upcoming Events
      </h2>

      {/* Search Bar (right aligned) */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input border border-secondary input-bordered w-full max-w-md"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
            >
              {/* Event Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={event.imageUrl || "https://via.placeholder.com/400x200"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Club:</strong> {event.clubName}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Max Attendees:</strong> {event.maxAttendees}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>

                {/* Already registered message */}
                {event.isRegistered && (
                  <p className="text-green-600 text-sm font-semibold mb-2">
                    ✅ You are already registered for this event
                  </p>
                )}

                {/* Register Button */}
                <button
                  disabled={event.isRegistered}
                  onClick={() => handleRegister(event._id)}
                  className={`mt-auto w-full py-2 rounded-xl font-semibold shadow-md transition-all ${
                    event.isRegistered
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                  }`}
                >
                  {event.isRegistered ? "Already Registered" : "Register Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
