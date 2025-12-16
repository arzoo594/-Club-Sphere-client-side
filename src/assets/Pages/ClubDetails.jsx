import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import { AuthContext } from "../Contexts/AuthContext";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [joined, setJoined] = useState(false);
  const [checkingJoin, setCheckingJoin] = useState(true);

  const { data: club, isLoading } = useQuery({
    queryKey: ["single-club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (user?.email && id) {
      axiosSecure
        .get(`/payments/status?email=${user.email}&clubId=${id}`)
        .then((res) => {
          setJoined(res.data.joined);
          setCheckingJoin(false);
        })
        .catch(() => setCheckingJoin(false));
    }
  }, [user, id, axiosSecure]);

  const handlePayment = async (clubId) => {
    const paymentInfo = {
      monthlyCharge: club.monthlyCharge,
      clubId,
      email: user.email,
      clubName: club.clubName,
      managerEmail: club.email,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  if (isLoading || checkingJoin) return <Loader />;

  if (!club)
    return (
      <p className="text-center mt-10 text-red-400 font-semibold">
        No club data found!
      </p>
    );

  return (
    <div className="relative min-h-screen overflow-hidden my-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]" />
      <div className="absolute top-24 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full" />

      <div className="relative w-11/12 max-w-5xl mx-auto py-14">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            {club.clubName}
          </h1>
          <p className="mt-3 text-purple-300">
            Build community • Create impact • Grow together
          </p>

          <div className="mt-4 flex justify-center gap-3">
            <span className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold">
              {club.clubType.toUpperCase()}
            </span>
            {joined && (
              <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold">
                Already Joined
              </span>
            )}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-purple-700/40 rounded-3xl shadow-2xl p-10">
          {/* Logo */}
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
              ["👥 Members", club.totalMembers],
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

          {/* About */}
          <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-purple-700/30">
            <h3 className="text-xl font-bold text-white mb-3">
              📘 About This Club
            </h3>
            <p className="text-purple-300 leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Join Section */}
          <div className="mt-12 text-center">
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-purple-700/40 shadow-xl">
              {joined ? (
                <>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    ✅ Membership Active
                  </h3>
                  <p className="text-purple-300">
                    You are already part of this club.
                  </p>
                </>
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
                    className="w-full py-3 rounded-full font-semibold text-white
                    bg-gradient-to-r from-pink-500 to-purple-600
                    hover:scale-105 hover:shadow-2xl transition"
                  >
                    Join Club
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-12 text-center text-sm text-purple-400">
            Powered by{" "}
            <span className="font-semibold text-white">ClubSphere</span> — Built
            with ❤️ by <strong>Arzoo Ahmed</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
