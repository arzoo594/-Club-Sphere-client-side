import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

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
      <div className="text-center py-20 text-gray-500 font-semibold">
        Loading your clubs...
      </div>
    );
  }

  if (!clubs.length) {
    return (
      <div className="text-center py-20 text-gray-400 font-semibold">
        You haven't joined any clubs yet.
      </div>
    );
  }

  return (
    <div className="p-6  grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white/50  backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 transition-transform transform hover:scale-[1.03] hover:shadow-3xl hover:border-indigo-300 duration-300"
        >
          {/* Header */}
          <div className="flex  items-center gap-4 mb-4">
            <img
              src={club.logoUrl}
              alt={club.clubName}
              className="w-16 h-16 rounded-xl border border-gray-200 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h2 className="text-xl font-bold text-indigo-700">
                {club.clubName}
              </h2>
              <p className="text-gray-500 text-sm font-medium">
                {club.clubType.toUpperCase()} Club
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {club.description}
          </p>

          {/* Club Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="block font-medium text-gray-500">Location</span>
              <p className="font-semibold text-gray-700">{club.location}</p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">
                Established
              </span>
              <p className="font-semibold text-gray-700">
                {new Date(club.establishmentDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">Members</span>
              <p className="font-semibold text-gray-700">{club.totalMembers}</p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">
                Monthly Fee
              </span>
              <p className="font-semibold text-gray-700">
                ৳ {club.monthlyCharge}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${
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
