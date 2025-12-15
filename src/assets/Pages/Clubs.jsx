import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../Components/Loader";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["all-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // Filter clubs by clubName
  const filteredClubs = clubs.filter((club) =>
    club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl mb-6 text-secondary text-center font-bold ">
        All Club
      </h1>
      {/* Search Box */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search clubs by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered border border-secondary w-full max-w-md"
        />
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <div
              key={club._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border overflow-hidden"
            >
              {/* IMAGE */}
              <figure className="w-full h-48 overflow-hidden">
                <img
                  src={club.logoUrl}
                  alt={club.clubName}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* BODY */}
              <div className="p-5 space-y-3">
                {/* Title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {club.clubName}
                  </h2>
                  {club.isPublished && (
                    <span className="badge badge-success">Published</span>
                  )}
                </div>

                {/* Type */}
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full w-fit">
                  {club.clubType?.toUpperCase()}
                </span>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {club.description.slice(0, 90)}...
                </p>

                {/* Info */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    📍 <span className="font-medium">{club.location}</span>
                  </p>
                  <p>
                    🗓 Established:{" "}
                    <span className="font-medium">
                      {new Date(club.establishmentDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    👥 <span className="font-bold">{club.totalMembers}</span>{" "}
                    Members
                  </p>
                </div>

                {/* Button */}
                <div className="pt-2">
                  <Link to={`/club-details/${club._id}`}>
                    <button className="btn btn-primary btn-sm w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No clubs found matching "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Clubs;
