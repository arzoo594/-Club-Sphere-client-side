import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ClubBarChart from "../Components/ClubBarChart";

const MetricCard = ({
  title,
  value,
  color,
  icon,
  loading,
  error,
  isCurrency = false,
}) => {
  if (loading) {
    return (
      <div
        className={`bg-gradient-to-br from-purple-700 to-indigo-700 p-6 rounded-2xl shadow-lg animate-pulse min-h-[150px] flex flex-col justify-center border-l-4 border-${color}-400`}
      >
        <p className="text-gray-300 font-semibold">{title}</p>
        <p className="text-3xl mt-2 font-extrabold text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 p-6 rounded-xl shadow-lg border-l-4 border-red-400`}
      >
        <p className="text-sm font-bold text-red-700">{title}</p>
        <p className="text-xs text-red-600">Failed: {error}</p>
      </div>
    );
  }

  const formattedValue = isCurrency
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    : new Intl.NumberFormat("en-US").format(value);

  return (
    <div
      className={`bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-l-4 border-${color}-400 text-white`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold uppercase tracking-wider">{title}</h2>
        <span className="text-white">{icon}</span>
      </div>

      <p className="text-4xl font-extrabold mt-2">{formattedValue}</p>
      <p className="text-sm mt-1 opacity-80">
        {isCurrency
          ? "Data from paid transactions."
          : "Total registered users."}
      </p>
    </div>
  );
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    revenue: 0,
    clubRevenueData: [],
    totalMembers: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setStats((prev) => ({ ...prev, loading: true, error: null }));

    axiosSecure
      .get("/admin-stats")
      .then((res) => {
        setStats((prev) => ({
          ...prev,
          revenue: res.data.totalRevenue,
          totalMembers: res.data.totalMembers,
          clubRevenueData: res.data.clubRevenueData,
          loading: false,
        }));
      })
      .catch((err) => {
        console.error("Admin stats fetch error:", err);
        setStats((prev) => ({
          ...prev,
          error: "Failed to load all dashboard stats.",
          loading: false,
          revenue: 0,
          totalMembers: 0,
          clubRevenueData: [],
        }));
      });
  }, [axiosSecure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59] p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-300 mb-8 border-b-4 border-purple-500 pb-3">
        👑 Admin Control Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <MetricCard
          title="Total Revenue Collected"
          value={stats.revenue}
          color="teal"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          }
          loading={stats.loading}
          error={stats.error}
          isCurrency={true}
        />

        <MetricCard
          title="Total Platform Members"
          value={stats.totalMembers}
          color="indigo"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 015.356-1.857M7 20h10"
              />
            </svg>
          }
          loading={stats.loading}
          error={stats.error}
          isCurrency={false}
        />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl">
        <ClubBarChart
          chartData={stats.clubRevenueData}
          loading={stats.loading}
          error={stats.error}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
