import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

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

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="relative min-h-screen overflow-hidden my-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]"></div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>

      <div className="relative w-11/12 max-w-7xl mx-auto py-12">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10
          bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
        >
          All Clubs (Admin) ({clubs.length})
        </h2>

        {clubs.length === 0 ? (
          <div className="text-center p-12 bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl shadow-2xl">
            <p className="text-purple-200 text-xl">No clubs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="group bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl overflow-hidden
                  hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
              >
                {/* Club Logo */}
                <div className="relative h-48 flex items-center justify-center bg-white/10 overflow-hidden">
                  <img
                    src={club.logoUrl}
                    alt={club.clubName}
                    className="h-full object-contain p-4 group-hover:scale-110 transition duration-500"
                  />
                  {club.isPublished && (
                    <span
                      className="absolute top-3 right-3 px-3 py-1 text-xs
                      bg-green-500 text-white rounded-full font-semibold"
                    >
                      Published
                    </span>
                  )}
                </div>

                {/* Club Info */}
                <div className="p-5 space-y-2 text-purple-200">
                  <h3 className="text-xl font-bold text-white">
                    {club.clubName}
                  </h3>
                  <p>
                    <span className="font-semibold">Type:</span> {club.clubType}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {club.location}
                  </p>
                  <p>
                    <span className="font-semibold">Manager:</span> {club.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {club.email}
                  </p>
                  <p>
                    <span className="font-semibold">Members:</span>{" "}
                    {club.totalMembers}
                  </p>
                  <p>
                    <span className="font-semibold">Monthly Charge:</span> $
                    {club.monthlyCharge}
                  </p>
                  <p>
                    <span className="font-semibold">Established:</span>{" "}
                    {new Date(club.establishmentDate).toLocaleDateString()}
                  </p>

                  <p
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      club.isPublished
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {club.isPublished ? "Published" : "Pending"}
                  </p>

                  <p className="text-purple-300 text-sm mt-2 line-clamp-3">
                    {club.description || "No description provided."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClubs;
