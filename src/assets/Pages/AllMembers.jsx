import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

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

  if (isLoading) return <p className="text-center mt-10">Loading members...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700">
        All Club Members (Admin View)
      </h2>

      {members.length === 0 ? (
        <p className="text-center text-gray-500">No club members found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
          <table className="table w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th>Serial No</th>
                <th>Customer Email</th>
                <th>Club Name</th>
                <th>Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member, index) => (
                <tr key={member._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-medium">{member.customerEmail}</td>
                  <td>
                    {member.clubName ? (
                      member.clubName
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td>
                    {member.paidAt
                      ? new Date(member.paidAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllMembers;
