// // // src/Components/ClubRevenuePieChart.jsx

// // import React from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // const COLORS = [
// //   "#0088FE",
// //   "#00C49F",
// //   "#FFBB28",
// //   "#FF8042",
// //   "#8884d8",
// //   "#82ca9d",
// //   "#ffc658",
// // ];

// // const ClubRevenuePieChart = ({ chartData, loading, error }) => {
// //   if (error) {
// //     return (
// //       <div className="bg-red-50 p-6 rounded-xl shadow-lg border border-red-400">
// //         <p className="text-xl font-bold text-red-700 mb-2">🛑 Data Error</p>
// //         <p className="text-gray-700">Failed to load chart data: {error}</p>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="text-center py-10 text-indigo-600 font-bold">
// //         Loading Revenue Chart...
// //       </div>
// //     );
// //   }

// //   if (!chartData || chartData.length === 0) {
// //     return (
// //       <div className="text-center py-10 text-gray-500">
// //         No paid revenue data available to display in the chart yet.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
// //         📊 Revenue Distribution by Club
// //       </h2>

// //       <div style={{ width: "100%", height: 400 }}>
// //         <ResponsiveContainer>
// //           <PieChart>
// //             <Pie
// //               data={chartData}
// //               dataKey="total"
// //               nameKey="clubName"
// //               cx="50%"
// //               cy="50%"
// //               outerRadius={150}
// //               fill="#8884d8"
// //               labelLine={true}
// //               label={({ name, percent }) =>
// //                 `${name}: ${(percent * 100).toFixed(1)}%`
// //               }
// //             >
// //               {chartData.map((entry, index) => (
// //                 <Cell
// //                   key={`cell-${index}`}
// //                   fill={COLORS[index % COLORS.length]}
// //                 />
// //               ))}
// //             </Pie>
// //             <Tooltip
// //               formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
// //             />
// //             <Legend layout="vertical" align="right" verticalAlign="middle" />
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClubRevenuePieChart;
// // src/Components/ClubBarChart.jsx

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const ClubBarChart = ({ chartData, loading, error }) => {
//   // ... error এবং loading স্টেট অপরিবর্তিত ...
//   if (error) {
//     return (
//       <div className="bg-red-50 p-6 rounded-xl shadow-lg border border-red-400">
//         <p className="text-xl font-bold text-red-700 mb-2">🛑 Data Error</p>
//         <p className="text-gray-700">Failed to load chart data: {error}</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-indigo-600 font-bold">
//         Loading Sales and Membership Chart...
//       </div>
//     );
//   }

//   if (!chartData || chartData.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No club data available to display in the Bar Chart yet.
//       </div>
//     );
//   }

//   // --- মূল চার্ট ডিসপ্লে ---
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
//         📈 Club Revenue & Member Count
//       </h2>

//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <BarChart
//             data={chartData} // এখন এতে clubName, total (Revenue), এবং members থাকবে
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="clubName" />

//             {/* বাম Y-Axis: Revenue-এর জন্য */}
//             <YAxis
//               yAxisId="left"
//               orientation="left"
//               stroke="#8884d8"
//               label={{
//                 value: "Revenue (USD)",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//             />

//             {/* ডান Y-Axis: Members-এর জন্য */}
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               stroke="#82ca9d"
//               label={{ value: "Members", angle: 90, position: "insideRight" }}
//             />

//             <Tooltip
//               formatter={(value, name) => {
//                 if (name === "total") {
//                   return [`$${value.toFixed(2)}`, "Revenue"];
//                 }
//                 return [value, "Members"];
//               }}
//             />
//             <Legend verticalAlign="top" height={36} />

//             {/* Revenue Bar: প্রথম সিরিজ */}
//             <Bar yAxisId="left" dataKey="total" fill="#8884d8" name="Revenue" />

//             {/* Members Bar: দ্বিতীয় সিরিজ */}
//             <Bar
//               yAxisId="right"
//               dataKey="members"
//               fill="#82ca9d"
//               name="Members"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ClubBarChart;
