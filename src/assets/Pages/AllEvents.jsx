import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

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
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (events.length === 0)
    return <p className="text-center mt-10">No events found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        All Events
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
          >
            <img
              src={event.imageUrl || "https://via.placeholder.com/400x200"}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Club:</strong> {event.clubName}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Date:</strong>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Max Attendees:</strong> {event.maxAttendees}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Status:</strong> {event.status}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Created By:</strong> {event.createdBy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
