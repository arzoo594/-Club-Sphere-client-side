// import React from "react";

// const ClubMembers = () => {
//   return (
//     <div>
//       <p>THis is a Club Members page</p>
//     </div>
//   );
// };

// export default ClubMembers;
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
      <div className="mt-10 text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border">
        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">
          👥 Club Members
        </h1>

        {members.length === 0 ? (
          <p className="text-center text-gray-500">
            No members have joined your club yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
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
                  <tr key={member._id} className="border-b hover:bg-gray-50">
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
