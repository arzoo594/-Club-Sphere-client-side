import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Loader } from "three/src/Three.Core.js";

const MyClub = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/email/${user.email}`).then((res) => {
      setClubs(res.data);
      setLoading(false);
    });
  }, [axiosSecure, user]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <Loader></Loader>
      </div>
    );
  }

  if (!clubs.length) {
    return <div className="text-center py-10">No club found</div>;
  }

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={club.logoUrl}
              alt={club.clubName}
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold">{club.clubName}</h2>
              <p className="text-sm text-gray-500">
                {club.clubType.toUpperCase()} Club
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {club.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Location</span>
              <p className="font-medium">{club.location}</p>
            </div>

            <div>
              <span className="text-gray-500">Established</span>
              <p className="font-medium">{club.establishmentDate}</p>
            </div>

            <div>
              <span className="text-gray-500">Members</span>
              <p className="font-medium">{club.totalMembers}</p>
            </div>

            <div>
              <span className="text-gray-500">Monthly Fee</span>
              <p className="font-medium">৳ {club.monthlyCharge}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium
                ${
                  club.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {club.isPublished ? "Published" : "Unpublished"}
            </span>

            <span className="text-xs text-gray-400">
              Approved: {new Date(club.approvedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyClub;
