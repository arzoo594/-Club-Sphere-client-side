import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../Components/Loader";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("newest");
  useEffect(() => {
    document.title = "Explore Clubs | ClubSphere";
  }, []);

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["all-clubs", sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?sort=${sort}`);
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  // ✅ Skeleton component
  const SkeletonCard = () => (
    <div className="animate-pulse group bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl overflow-hidden h-80">
      <div className="h-48 bg-purple-700/20 w-full"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-purple-600/40 rounded w-3/4"></div>
        <div className="h-4 bg-purple-600/30 rounded w-1/2"></div>
        <div className="h-4 bg-purple-600/30 rounded w-full"></div>
        <div className="h-4 bg-purple-600/30 rounded w-5/6"></div>
        <div className="mt-4 h-10 bg-purple-500/40 rounded-full w-full"></div>
      </div>
    </div>
  );

  const filteredClubs = clubs.filter((club) =>
    club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative rounded-2xl min-h-screen overflow-hidden my-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]"></div>

      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>

      <div className="relative w-11/12 max-w-7xl mx-auto py-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Explore All Clubs
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-purple-500/20">
          {/* Search Bar */}
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="🔍 Search clubs by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-white/10 text-white placeholder-purple-300 border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-purple-300 font-semibold">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered bg-purple-900/40 text-white border-purple-600/50 rounded-2xl focus:outline-none focus:border-pink-500"
            >
              <option value="newest" className="bg-[#1a0033]">
                ✨ Newest First
              </option>
              <option value="oldest" className="bg-[#1a0033]">
                ⏳ Oldest First
              </option>
              <option value="priceLow" className="bg-[#1a0033]">
                💵 Fee: Low to High
              </option>
              <option value="priceHigh" className="bg-[#1a0033]">
                💰 Fee: High to Low
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // ✅ Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          ) : filteredClubs.length > 0 ? (
            filteredClubs.map((club) => (
              <div
                key={club._id}
                className="group bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={club.logoUrl}
                    alt={club.clubName}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs bg-green-500 text-white rounded-full font-semibold">
                    Published
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3 text-purple-200">
                  <h2 className="text-xl font-bold text-white">
                    {club.clubName}
                  </h2>
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300">
                    {club.clubType?.toUpperCase()}
                  </span>

                  <p className="text-sm text-purple-300 line-clamp-2">
                    {club.description}
                  </p>

                  <div className="text-sm space-y-1 opacity-80">
                    <p>📍 {club.location}</p>
                    <p>
                      💳 Monthly Fee:{" "}
                      <span className="font-bold text-pink-400">
                        ${club.monthlyCharge}
                      </span>
                    </p>
                    <p>👥 Members: {club.totalMembers || 0}</p>
                  </div>

                  {/* Button */}
                  <Link to={`/club-details/${club._id}`}>
                    <button className="mt-4 w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition active:scale-95">
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
      </div>
    </div>
  );
};

export default Clubs;
