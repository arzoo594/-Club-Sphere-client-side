import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: club, isLoading } = useQuery({
    queryKey: ["single-club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);

      return res.data;
    },
  });
  const handlePayment = async () => {
    const paymentInfo = {
      monthlyCharge: club.monthlyCharge,
      clubId: club._id,
      email: club.email,
      clubName: club.clubName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        <Loader></Loader>
      </p>
    );

  if (!club)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        No club data found!
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Branding */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
            ClubSphere
          </h1>
          <p className="text-lg opacity-90 mt-2">
            Elevating Clubs & Communities —{" "}
            <span className="font-semibold">CLUBSPHERE_DEV_HELP</span>
          </p>
          <p className="text-sm opacity-80">
            Discover, Manage, and Grow Your Community with Style ✨
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src={club.logoUrl}
            alt="logo"
            className="w-36 h-36 rounded-full border-4 border-indigo-200 shadow-lg object-cover"
          />
          <h2 className="text-4xl font-bold mt-4 text-gray-800">
            {club.clubName}
          </h2>

          <span className="mt-3 px-4 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full shadow">
            {club.clubType.toUpperCase()}
          </span>
          <h1 className="mt-3 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full shadow">
            {club._id}
          </h1>
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">📍 Location</p>
            <p className="text-xl font-semibold">{club.location}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">🗓 Established</p>
            <p className="text-xl font-semibold">
              {new Date(club.establishmentDate).toLocaleDateString()}
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">👤 Founder</p>
            <p className="text-xl font-semibold">{club.name}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">📧 Contact Email</p>
            <p className="text-xl font-semibold">{club.email}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">👥 Total Members</p>
            <p className="text-xl font-semibold">{club.totalMembers}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">💳 Monthly Charge</p>
            <p className="text-xl font-semibold">{club.monthlyCharge} $</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">📌 Published Status</p>
            <p className="text-xl font-semibold">
              {club.isPublished ? "Published ✔" : "Pending"}
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border shadow-sm">
            <p className="text-gray-600 text-sm">⏳ Approved At</p>
            <p className="text-xl font-semibold">
              {new Date(club.approvedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 bg-gray-50 p-6 rounded-2xl shadow-md border">
          <h3 className="text-xl font-bold mb-2">📘 About This Club</h3>
          <p className="text-gray-700 leading-relaxed">{club.description}</p>
        </div>

        {/* Join Club UI */}
        <div className="mt-10 text-center">
          <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30 mx-auto">
            <h3 className="text-2xl font-bold mb-4">Become a Member</h3>
            <p className="mb-4">
              Monthly Charge: <strong>{club.monthlyCharge} $</strong>
            </p>
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all"
            >
              Join Club
            </button>
            <p className="mt-4 text-sm text-white/70">CLUBSPHERE_DEV_HELP</p>
          </div>
        </div>

        {/* Footer Branding */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Powered by{" "}
          <span className="font-semibold text-indigo-600">ClubSphere</span> —
          Built with ❤️ <strong>Arzoo Ahmed</strong>
        </p>
      </div>
    </div>
  );
};

export default ClubDetails;
