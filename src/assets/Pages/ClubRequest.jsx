import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const ClubRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: clubRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-club-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/club-requests");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/club-requests/approve/${id}`),
    onSuccess: () => {
      Swal.fire({
        title: "Approved! 🎉",
        text: "Club request approved successfully.",
        icon: "success",
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to approve.",
        icon: "error",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/club-requests/reject/${id}`),
    onSuccess: () => {
      Swal.fire({
        title: "Rejected! 🗑️",
        text: "Club request rejected.",
        icon: "info",
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to reject.",
        icon: "error",
      });
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Approve and publish this club?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then((result) => result.isConfirmed && approveMutation.mutate(id));
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this club request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading || approveMutation.isPending || rejectMutation.isPending) {
    return <Loader />;
  }

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
          Club Requests ({clubRequests.length})
        </h2>

        {clubRequests.length === 0 ? (
          <div className="text-center p-12 bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl shadow-2xl">
            <p className="text-purple-200 text-xl">No pending club requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubRequests.map((request, index) => {
              const isProcessed = request.status !== "pending";
              let statusColor = "bg-yellow-400";
              if (request.status === "approved") statusColor = "bg-green-500";
              else if (request.status === "rejected")
                statusColor = "bg-red-500";

              return (
                <div
                  key={request._id}
                  className="group bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-2xl overflow-hidden
                    hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                >
                  {/* Club Info */}
                  <div className="p-5 space-y-3 text-purple-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">
                        {request.clubName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${statusColor}`}
                      >
                        {request.status.toUpperCase()}
                      </span>
                    </div>

                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold
                      rounded-full bg-purple-500/20 text-purple-300"
                    >
                      {request.clubType?.toUpperCase()}
                    </span>

                    <p className="text-sm text-purple-300 truncate">
                      {request.email}
                    </p>

                    <div className="flex justify-between mt-4 gap-2">
                      <button
                        onClick={() => handleApprove(request._id)}
                        disabled={isProcessed}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full font-semibold
                          bg-green-500 text-white hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaCheckCircle /> Approve
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        disabled={isProcessed}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full font-semibold
                          bg-red-500 text-white hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubRequest;
