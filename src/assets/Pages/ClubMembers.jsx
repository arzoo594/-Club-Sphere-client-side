import React, { useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import { AuthContext } from "../Contexts/AuthContext";

const ClubMembers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["club-members", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/club-members?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="mt-20 text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-8 bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 transition-transform duration-500 hover:shadow-3xl">
        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 flex items-center gap-3">
          <span>👥</span> Club Members
        </h1>

        {members.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold">
            No members have joined your club yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-inner">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Member Email</th>
                  <th className="p-3 text-left">Club Name</th>
                  <th className="p-3 text-left">Transaction ID</th>
                  <th className="p-3 text-left">Tracking ID</th>
                  <th className="p-3 text-left">Joined At</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-3">{member.customerEmail}</td>
                    <td className="p-3">{member.clubName}</td>
                    <td className="p-3 text-sm break-all">
                      {member.transactionId}
                    </td>
                    <td className="p-3 font-semibold text-indigo-600">
                      {member.trackingId}
                    </td>
                    <td className="p-3">
                      {new Date(member.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubMembers;
