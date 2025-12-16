import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosSecure.post("/events", data);
      Swal.fire({
        icon: "success",
        title: "Event Created",
        text: "Event has been successfully created!",
      });
      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to create event",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl text-black mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Create Event
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Club ID */}
        <div>
          <label className="block mb-2 font-medium">Club ID</label>
          <input
            type="text"
            {...register("clubId", { required: "Club ID is required" })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.clubId && (
            <p className="text-red-500 mt-1">{errors.clubId.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium">Club Name</label>
          <input
            type="text"
            {...register("clubName", { required: "Club name is required" })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.clubName && (
            <p className="text-red-500 mt-1">{errors.clubName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Event Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="block mb-2 font-medium">Event Date</label>
          <input
            type="date"
            {...register("eventDate", { required: "Event date is required" })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.eventDate && (
            <p className="text-red-500 mt-1">{errors.eventDate.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.location && (
            <p className="text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Max Attendees */}
        <div>
          <label className="block mb-2 font-medium">Max Attendees</label>
          <input
            type="number"
            {...register("maxAttendees")}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Event Image URL */}
        <div>
          <label className="block mb-2 font-medium">Event Image URL</label>
          <input
            type="text"
            {...register("imageUrl")}
            placeholder="https://example.com/event.jpg"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Created By */}
        <div>
          <label className="block mb-2 font-medium">Created By (Email)</label>
          <input
            type="email"
            defaultValue={user.email}
            {...register("createdBy", { required: "Created By is required" })}
            placeholder="your.email@example.com"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.createdBy && (
            <p className="text-red-500 mt-1">{errors.createdBy.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
