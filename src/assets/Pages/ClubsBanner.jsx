import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../Components/Loader";

const ClubsBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["all-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  if (isLoading) return <Loader />;

  // Limit to only 6 clubs
  const bannerClubs = clubs.slice(0, 6);

  const filteredClubs = bannerClubs.filter((club) =>
    club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative rounded-2xl min-h-screen overflow-hidden my-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]"></div>

      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>

      <div className="relative w-11/12 max-w-7xl mx-auto py-12">
        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-10
          bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Explore Featured Clubs
        </h1>

        {/* Search */}
        <div className="flex justify-center md:justify-end mb-10">
          <input
            type="text"
            placeholder="🔍 Search clubs by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-5 py-3 rounded-full bg-white/10
            text-white placeholder-purple-300 border border-purple-600
            focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club) => (
              <div
                key={club._id}
                className="group bg-white/5 backdrop-blur-xl border
                border-purple-700/40 rounded-2xl overflow-hidden
                hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={club.logoUrl}
                    alt={club.clubName}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
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

                {/* Content */}
                <div className="p-5 space-y-3 text-purple-200">
                  <h2 className="text-xl font-bold text-white">
                    {club.clubName}
                  </h2>

                  <span
                    className="inline-block px-3 py-1 text-xs font-semibold
                    rounded-full bg-purple-500/20 text-purple-300"
                  >
                    {club.clubType?.toUpperCase()}
                  </span>

                  <p className="text-sm text-purple-300">
                    {club.description.slice(0, 90)}...
                  </p>

                  <div className="text-sm space-y-1">
                    <p>
                      📍 <span className="font-medium">{club.location}</span>
                    </p>
                    <p>
                      🗓 Established:{" "}
                      {new Date(club.establishmentDate).toLocaleDateString()}
                    </p>
                    <p>
                      👥 <span className="font-bold">{club.totalMembers}</span>{" "}
                      Members
                    </p>
                  </div>

                  {/* Button */}
                  <Link to={`/club-details/${club._id}`}>
                    <button
                      className="mt-4 w-full py-2 rounded-full font-semibold text-white
                      bg-gradient-to-r from-pink-500 to-purple-600
                      hover:scale-105 transition"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-purple-300">
              No clubs found matching "{searchTerm}"
            </p>
          )}
        </div>
        <Link
          to="/clubs"
          className="mt-10 text-center text-xl mx-auto block px-8 py-3 text-white font-semibold rounded-full
             bg-gradient-to-r from-pink-500 to-purple-600
             hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Our All Clubs
        </Link>
      </div>
    </div>
  );
};

export default ClubsBanner;
