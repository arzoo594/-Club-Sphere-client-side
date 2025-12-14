// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../Hooks/useAxiosSecure";

// const Events = () => {
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: events = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["events"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/events");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center mt-10">Loading events...</p>;
//   if (isError)
//     return <p className="text-center mt-10">Error: {error.message}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
//         Upcoming Events
//       </h2>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-500">No events found.</p>
//       ) : (
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
//             >
//               <div className="h-48 w-full overflow-hidden">
//                 <img
//                   src={event.imageUrl || "https://via.placeholder.com/400x200"}
//                   alt={event.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="p-6 flex flex-col justify-between h-full">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-2 text-gray-800">
//                     {event.title}
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-1">
//                     <strong>Club:</strong> {event.clubName}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-1">
//                     <strong>Date:</strong>{" "}
//                     {new Date(event.eventDate).toLocaleDateString()}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-1">
//                     <strong>Location:</strong> {event.location}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-1">
//                     <strong>Max Attendees:</strong> {event.maxAttendees}
//                   </p>
//                   <p className="text-sm text-gray-500 mb-2">
//                     <strong>Created By:</strong> {event.createdBy}
//                   </p>
//                   <p className="text-gray-600 text-sm">{event.description}</p>
//                 </div>

//                 <div className="p-6 flex flex-col">
//                   <div className="mb-4">{/* Event details */}</div>
//                   <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all">
//                     Register Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Events;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Events = () => {
  const axiosSecure = useAxiosSecure();

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
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
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Created By:</strong> {event.createdBy}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>

                {/* Register Now Button */}
                <button className="mt-auto w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all">
                  Register Now
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
