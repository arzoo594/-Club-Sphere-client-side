import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const MemberEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: registeredEvents = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registered-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/event-register-email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading your events...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700">
        My Registered Events
      </h2>

      {registeredEvents.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not registered for any events yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {registeredEvents.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl p-5 border"
            >
              <p className="text-sm text-gray-500 mb-1">
                <strong>Event ID:</strong> {item.eventId}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Club ID:</strong> {item.clubId}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  {item.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Registered At:</strong>{" "}
                {new Date(item.registeredAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberEvents;
