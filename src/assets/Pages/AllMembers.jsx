import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

const AllMembers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allClubMembers"],
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
          All Club Members (Admin View) ({members.length})
        </h2>

        {members.length === 0 ? (
          <div className="text-center p-12 bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl shadow-2xl">
            <p className="text-purple-200 text-xl">No club members found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={member._id}
                className="group bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl overflow-hidden
                  hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-5 space-y-3 text-purple-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {member.clubName || "N/A"}
                  </h3>
                  <span className="px-3 py-1 text-xs rounded-full font-semibold bg-blue-500 text-white">
                    #{index + 1}
                  </span>
                </div>

                <p className="text-sm text-purple-300">
                  <span className="font-medium">Email:</span> {member.email}
                </p>
                <p className="text-sm text-purple-300">
                  <span className="font-medium">Approved Date:</span>{" "}
                  {member.approvedAt
                    ? new Date(member.approvedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMembers;
