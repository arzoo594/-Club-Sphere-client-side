import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ClubBarChart = ({ chartData, loading, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl shadow-lg border border-red-400">
        <p className="text-xl font-bold text-red-700 mb-2">🛑 Data Error</p>
        <p className="text-gray-700">Failed to load chart data: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-indigo-600 font-bold">
        Loading Club Analytics Chart...
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No club data available to display in the Bar Chart yet.
      </div>
    );
  }

  // Gradient colors for bars
  const revenueGradient = "url(#revenueGradient)";
  const membersGradient = "url(#membersGradient)";

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/20 pb-2">
        📈 Club Revenue & Member Count
      </h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.6} />
              </linearGradient>

              <linearGradient id="membersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />

            <XAxis
              dataKey="clubName"
              tick={{ fill: "white" }}
              axisLine={{ stroke: "#ffffff50" }}
              tickLine={{ stroke: "#ffffff50" }}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              tick={{ fill: "white" }}
              label={{
                value: "Revenue (USD)",
                angle: -90,
                position: "insideLeft",
                fill: "white",
              }}
              tickFormatter={(value) => `$${value}`}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#34d399"
              tick={{ fill: "white" }}
              label={{
                value: "Members",
                angle: 90,
                position: "insideRight",
                fill: "white",
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "10px",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
              }}
              formatter={(value, name) => {
                if (name === "Revenue")
                  return [`$${value.toFixed(2)}`, "Revenue"];
                return [value, "Members"];
              }}
            />

            <Legend wrapperStyle={{ color: "white", fontWeight: "bold" }} />

            <Bar
              yAxisId="left"
              dataKey="total"
              name="Revenue"
              fill={revenueGradient}
              radius={[8, 8, 0, 0]}
            />

            <Bar
              yAxisId="right"
              dataKey="members"
              name="Members"
              fill={membersGradient}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClubBarChart;
