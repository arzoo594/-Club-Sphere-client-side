import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const MyClubsMember = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/customer-email/${user.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load payments");
        setLoading(false);
      });
  }, [axiosSecure, user]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!payments.length)
    return (
      <div className="text-center  py-2">
        <p className="text-gray-500">
          {" "}
          You haven’t joined any club yet.<br></br> Please Join Club.
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Joined Clubs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Club Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Tracking ID
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm text-gray-800">
                  {p.clubName || "N/A"}
                </td>

                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  ${p.amount}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        p.paymemtStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {p.paymemtStatus}
                  </span>
                </td>

                <td className="px-4 py-3 text-xs text-gray-600 break-all">
                  {p.transactionId}
                </td>

                <td className="px-4 py-3 text-xs text-gray-600">
                  {p.trackingId || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClubsMember;
