import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const STATIC_STATS = [
  {
    title: "Total Registered Clubs",
    value: "50+",
    color: "blue",
    icon: (
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: "Platform Active Users",
    value: "2,500",
    color: "purple",
    icon: (
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
    ),
  },
];

const StaticStatCard = ({ title, value, color, icon }) => {
  let bgColor, textColor;
  if (color === "blue") {
    bgColor = "bg-blue-100/20 hover:bg-blue-200/20";
    textColor = "text-blue-400";
  } else if (color === "purple") {
    bgColor = "bg-purple-100/20 hover:bg-purple-200/20";
    textColor = "text-purple-400";
  }

  return (
    <div
      className={`p-6 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md transition duration-300 ${bgColor}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-semibold uppercase ${textColor}`}>
            {title}
          </p>
          <p className="text-3xl font-extrabold text-white mt-1">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full bg-white/10 ${textColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <p className="text-xs text-white/60 mt-3">Last updated: Today</p>
    </div>
  );
};

const AllClubTotalPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/total-revenue")
      .then((res) => {
        setRevenue(res.data.totalRevenue || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load total revenue. Please check server status.");
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 animate-pulse min-h-[200px]">
        <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl h-[180px] flex items-center justify-center">
          <p className="text-white/70 font-semibold text-xl">
            Fetching Financial Data...
          </p>
        </div>
        <div className="space-y-6 hidden md:block">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl h-[100px]"></div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl h-[100px]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 p-6 rounded-2xl shadow-xl border border-red-400/30">
        <p className="text-xl font-bold text-red-200 mb-2 flex items-center">
          ⚠️ Error
        </p>
        <p className="text-red-100">{error}</p>
      </div>
    );
  }

  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(revenue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {/* Revenue Card */}
      <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-teal-500/80 to-teal-700/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-white transform transition duration-500 hover:scale-[1.01] hover:shadow-3xl">
        <div className="absolute top-0 right-0 h-32 w-32 bg-teal-400/20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm font-light uppercase tracking-widest opacity-80">
              Total Platform Revenue
            </p>
            <p className="text-5xl md:text-6xl font-extrabold mt-2">
              {formattedRevenue}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8m0-8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <p className="text-xs font-light opacity-80 mt-4">
          This represents the sum of all paid transactions across all clubs.
        </p>
      </div>

      {/* Static Stats */}
      <div className="md:col-span-1 space-y-6">
        {STATIC_STATS.map((stat, index) => (
          <StaticStatCard
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default AllClubTotalPayments;
