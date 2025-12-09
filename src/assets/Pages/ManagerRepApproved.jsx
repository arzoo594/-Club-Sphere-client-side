import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";

const ManagerRepApproved = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["club-manager-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/club-manager-requests");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // ✅ Accept handler with SweetAlert
  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(
        `/club-manager-request/approve/${id}`
      );
      if (res.data.message) {
        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "This request has been approved and user is now a Manager.",
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // ✅ Reject handler with SweetAlert
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/club-manager-request/reject/${id}`);
      if (res.data.message) {
        Swal.fire({
          icon: "info",
          title: "Rejected",
          text: "This request has been rejected.",
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="p-4">
      <p className="mb-4 text-lg font-semibold text-purple-700">
        Total Requests: {requests.length}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200">
          <thead className="bg-purple-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Request No</th>
              <th className="px-4 py-2 text-left">Club Name</th>
              <th className="px-4 py-2 text-left">Club Type</th>
              <th className="px-4 py-2 text-left">Manager Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Established Year</th>
              <th className="px-4 py-2 text-left">Has Experience</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request, index) => (
              <tr key={request._id} className="hover:bg-purple-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{request.clubName}</td>
                <td className="px-4 py-2">{request.clubType}</td>
                <td className="px-4 py-2">{request.email}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">{request.establishedYear}</td>
                <td className="px-4 py-2">
                  {request.hasExperience ? "Yes" : "No"}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleAccept(request._id)}
                    className={`
 bg-green-500 text-white px-3 py-1 rounded transition
 ${
   request.status === "approved"
     ? "opacity-50 cursor-not-allowed"
     : "hover:bg-green-600"
 }
 `}
                    disabled={request.status === "approved"}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(request._id)}
                    className={`
 bg-red-500 text-white px-3 py-1 rounded transition
 ${
   request.status === "approved"
     ? "opacity-50 cursor-not-allowed"
     : "hover:bg-red-600"
 }
 `}
                    disabled={request.status === "approved"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {requests.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No requests found.</p>
      )}
    </div>
  );
};

export default ManagerRepApproved;
