import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../Components/Loader";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["all-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");

      console.log("API RESPONSE:", res.data);

      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="card bg-base-100 w-96 shadow-md border rounded-lg"
        >
          <figure className="bg-gray-100 w-full h-48 overflow-hidden">
            <img
              src={club.logoUrl}
              alt={club.clubName}
              className="w-full h-full p-2 object-cover"
            />
          </figure>

          <div className="card-body space-y-2">
            {/* Club Name */}
            <h2 className="card-title text-lg font-bold flex items-center gap-2">
              {club.clubName}
              {club.isPublished && (
                <div className="badge badge-success">Published</div>
              )}
            </h2>

            {/* Club Type */}
            <p className="text-sm font-semibold text-blue-600">
              {club.clubType?.toUpperCase()}
            </p>

            {/* Description */}
            <p className="text-sm">{club.description}</p>

            {/* Location */}
            <p className="text-sm">
              📍 <span className="font-medium">{club.location}</span>
            </p>

            {/* Establishment Date */}
            <p className="text-sm">
              🗓 Established:{" "}
              <span className="font-medium">
                {new Date(club.establishmentDate).toLocaleDateString()}
              </span>
            </p>

            {/* Total Members */}
            <p className="text-sm">
              👥 <span className="font-bold">{club.totalMembers}</span> Members
            </p>

            {/* Action Button */}
            <div className="card-actions justify-end mt-4">
              <Link to={`/clubs/${club._id}`}>
                <button className="btn btn-sm btn-primary">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clubs;
