import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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

  if (isLoading) return <Loader />;

  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(
        `/club-manager-request/approve/${id}`
      );
      if (res.data.message) {
        Swal.fire({
          icon: "success",
          title: "Approved! ✅",
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

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/club-manager-request/reject/${id}`);
      if (res.data.message) {
        Swal.fire({
          icon: "info",
          title: "Rejected ❌",
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

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(
        `/club-manager-request/make-admin/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Success 🎉",
        text: res.data.message,
      });

      refetch();
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Oops ❌",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden my-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]"></div>
      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>

      <div className="relative w-11/12 max-w-7xl mx-auto py-12">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10
          bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Club Manager Requests ({requests.length})
        </h2>

        {requests.length === 0 ? (
          <div className="text-center p-12 bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl shadow-2xl">
            <p className="text-purple-200 text-xl">No requests found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.map((req, index) => {
              const isProcessed = req.status !== "pending";
              let statusColor = "bg-yellow-400";
              if (req.status === "approved") statusColor = "bg-green-500";
              else if (req.status === "rejected") statusColor = "bg-red-500";

              return (
                <div
                  key={req._id}
                  className="group bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl overflow-hidden
                    hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-5 space-y-3 text-purple-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">
                        {req.clubName}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold text-white ${statusColor}`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </div>

                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300">
                      {req.clubType?.toUpperCase()}
                    </span>

                    <p className="text-sm text-purple-300 truncate">
                      Manager Email: {req.email}
                    </p>

                    <div className="text-sm space-y-1">
                      <p>
                        Established Year:{" "}
                        <span className="font-medium">
                          {req.establishedYear}
                        </span>
                      </p>
                      <p>
                        Has Experience:{" "}
                        <span className="font-medium">
                          {req.hasExperience ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleAccept(req._id)}
                        disabled={isProcessed}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full font-semibold
                          bg-green-500 text-white hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <FaCheckCircle /> Accept
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        disabled={isProcessed}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full font-semibold
                          bg-red-500 text-white hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMakeAdmin(req._id)}
                    disabled={req.status !== "approved"}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full font-semibold
      bg-blue-500 text-white w-full hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    🛡 Make Admin
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerRepApproved;
