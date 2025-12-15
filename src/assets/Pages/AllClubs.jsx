import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllClubs = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: clubs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/club-memberss");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading clubs...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700">
        All Clubs (Admin)
      </h2>

      {clubs.length === 0 ? (
        <p className="text-center text-gray-500">No clubs found</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Club Logo */}
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={club.logoUrl}
                  alt={club.clubName}
                  className="h-full object-contain p-4"
                />
              </div>

              {/* Club Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {club.clubName}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {club.clubType}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {club.location}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Manager:</strong> {club.name}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {club.email}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Total Members:</strong> {club.totalMembers}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Monthly Charge:</strong> ${club.monthlyCharge}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Established:</strong>{" "}
                  {new Date(club.establishmentDate).toLocaleDateString()}
                </p>

                {/* Status */}
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    club.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {club.isPublished ? "Published" : "Pending"}
                </span>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-4 line-clamp-3">
                  {club.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClubs;
