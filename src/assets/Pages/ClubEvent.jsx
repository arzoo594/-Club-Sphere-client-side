import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ClubEvent = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/my-events/${user.email}`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, [axiosSecure, user]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-semibold">
        Loading your events...
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-20 text-gray-400 font-semibold">
        You haven't created any events yet.
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 transition-transform transform hover:scale-[1.03] hover:shadow-3xl hover:border-indigo-300 duration-300"
        >
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-indigo-700">{event.title}</h2>
            <p className="text-gray-500 text-sm">{event.clubName}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>

          {/* Event Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="block font-medium text-gray-500">Date</span>
              <p className="font-semibold text-gray-700">
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">Location</span>
              <p className="font-semibold text-gray-700">{event.location}</p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">
                Max Attendees
              </span>
              <p className="font-semibold text-gray-700">
                {event.maxAttendees || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubEvent;
