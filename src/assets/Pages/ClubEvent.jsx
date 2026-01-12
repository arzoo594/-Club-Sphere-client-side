import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";

const ClubEvent = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["my-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-events/${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-events"]);
      Swal.fire("Deleted!", "Event has been removed.", "success");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/events/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-events"]);
      setEditingId(null);
      Swal.fire("Updated!", "Event details updated successfully.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const startEdit = (event) => {
    setEditingId(event._id);
    setEditData({ ...event });
  };

  const handleUpdateSave = (id) => {
    updateMutation.mutate({ id, data: editData });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl text-black mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center gap-2">
        📅 My Created Events
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col transition-all hover:shadow-2xl"
          >
            {editingId === event._id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg focus:ring-2 ring-indigo-300 outline-none font-bold"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  placeholder="Event Title"
                />
                <textarea
                  className="w-full border p-2 rounded-lg h-24 text-sm"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  placeholder="Description"
                />
                <input
                  type="date"
                  className="w-full border p-2 rounded-lg text-sm"
                  value={editData.eventDate?.split("T")[0]}
                  onChange={(e) =>
                    setEditData({ ...editData, eventDate: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg text-sm"
                  value={editData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                  placeholder="Location"
                />
                <input
                  type="number"
                  className="w-full border p-2 rounded-lg text-sm"
                  value={editData.maxAttendees}
                  onChange={(e) =>
                    setEditData({ ...editData, maxAttendees: e.target.value })
                  }
                  placeholder="Max Attendees"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleUpdateSave(event._id)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-xl font-bold hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-indigo-700 leading-tight">
                    {event.title}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(event)}
                      className="text-blue-500 hover:scale-125 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 hover:scale-125 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
                  {event.clubName}
                </p>

                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3 italic">
                  "{event.description}"
                </p>

                <div className="bg-indigo-50 rounded-2xl p-4 grid grid-cols-2 gap-y-3 text-sm">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-tighter">
                      Event Date
                    </span>
                    <p className="font-bold text-indigo-900">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-tighter">
                      Location
                    </span>
                    <p className="font-bold text-indigo-900 line-clamp-1">
                      {event.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-tighter">
                      Attendees
                    </span>
                    <p className="font-bold text-indigo-900">
                      {event.maxAttendees || "Unlimited"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-tighter">
                      Created By
                    </span>
                    <p className="font-bold text-indigo-900 text-[10px] truncate">
                      {event.createdBy}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubEvent;
