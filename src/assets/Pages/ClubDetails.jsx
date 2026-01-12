import React, { useContext } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import { AuthContext } from "../Contexts/AuthContext";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // 1. Fetch Club Details
  const { data: club, isLoading: isClubLoading } = useQuery({
    queryKey: ["single-club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  const { data: joinData, isLoading: isJoinLoading } = useQuery({
    queryKey: ["payment-status", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/status?email=${user.email}&clubId=${id}`
      );
      return res.data;
    },
  });

  const isJoined = joinData?.joined || false;

  const handlePayment = async (clubId) => {
    const paymentInfo = {
      monthlyCharge: club.monthlyCharge,
      clubId,
      email: user.email,
      clubName: club.clubName,
      managerEmail: club.email,
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  if (isClubLoading || isJoinLoading) return <Loader />;

  if (!club)
    return (
      <p className="text-center mt-10 text-red-400 font-semibold">
        No club data found!
      </p>
    );

  return (
    <div className="relative min-h-screen overflow-hidden my-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]" />
      <div className="absolute top-24 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full" />

      <div className="relative w-11/12 max-w-5xl mx-auto py-14">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            {club.clubName}
          </h1>
          <p className="mt-3 text-purple-300">
            Build community • Create impact • Grow together
          </p>

          <div className="mt-4 flex justify-center gap-3">
            <span className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold uppercase">
              {club.clubType}
            </span>
            {isJoined && (
              <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold border border-green-500/30">
                ✓ Already Joined
              </span>
            )}
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-3xl shadow-2xl p-10">
          <div className="flex justify-center -mt-24 mb-8">
            <img
              src={club.logoUrl}
              alt="Club Logo"
              className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-xl object-cover bg-white"
            />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-200">
            {[
              ["📍 Location", club.location],
              [
                "🗓 Established",
                new Date(club.establishmentDate).toLocaleDateString(),
              ],
              ["👤 Founder", club.name],
              ["📧 Contact", club.email],
              ["👥 Members", club.totalMembers || 0],
              ["💳 Monthly Charge", `$${club.monthlyCharge}`],
              ["📌 Status", club.isPublished ? "Published" : "Pending"],
              ["⏳ Approved At", new Date(club.approvedAt).toLocaleString()],
            ].map(([label, value]) => (
              <div
                key={label}
                className="p-5 rounded-xl bg-white/5 border border-purple-700/30"
              >
                <p className="text-sm text-purple-400">{label}</p>
                <p className="text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Join Section */}
          <div className="mt-12 text-center">
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-purple-700/40 shadow-xl">
              {isJoined ? (
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-green-400">
                    Membership Active
                  </h3>
                  <p className="text-purple-300">
                    Welcome back! You have full access to this club.
                  </p>
                  <div className="py-2 px-4 bg-green-500/10 text-green-300 rounded-lg border border-green-500/20 inline-block">
                    Payment Verified
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Become a Member
                  </h3>
                  <p className="text-purple-300 mb-5">
                    Monthly Charge:{" "}
                    <span className="font-bold text-white">
                      ${club.monthlyCharge}
                    </span>
                  </p>

                  <button
                    onClick={() => handlePayment(club._id)}
                    className="w-full py-3 rounded-full font-bold text-white
                    bg-gradient-to-r from-pink-500 to-purple-600
                    hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition duration-300"
                  >
                    Join Club Now
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-purple-400">
            Powered by{" "}
            <span className="font-semibold text-white">ClubSphere</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
