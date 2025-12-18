import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyClub = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/email/${user.email}`).then((res) => {
      setClubs(res.data);
      setLoading(false);
    });
  }, [axiosSecure, user]);

  const handleUpdate = async (id) => {
    const club = clubs.find((c) => c._id === id);
    if (!club) return;

    const { value: formValues } = await Swal.fire({
      title: "Update Club Details",
      html:
        `<input id="swal-clubName" class="swal2-input" placeholder="Name" value="${club.clubName}">` +
        `<input id="swal-clubType" class="swal2-input" placeholder="Type" value="${club.clubType}">` +
        `<input id="swal-location" class="swal2-input" placeholder="Location" value="${club.location}">` +
        `<input id="swal-monthlyCharge" type="number" class="swal2-input" placeholder="Monthly Charge" value="${club.monthlyCharge}">` +
        `<input id="swal-description" class="swal2-input" placeholder="Description" value="${club.description}">` +
        `<input id="swal-logoUrl" class="swal2-input" placeholder="Logo URL" value="${club.logoUrl}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          clubName: document.getElementById("swal-clubName").value,
          clubType: document.getElementById("swal-clubType").value,
          location: document.getElementById("swal-location").value,
          monthlyCharge: parseFloat(
            document.getElementById("swal-monthlyCharge").value
          ),
          description: document.getElementById("swal-description").value,
          logoUrl: document.getElementById("swal-logoUrl").value,
        };
      },
    });

    if (formValues) {
      try {
        const res = await axiosSecure.patch(`/clubs/${id}`, formValues);
        Swal.fire("Updated!", res.data.message, "success");
        setClubs((prev) =>
          prev.map((c) => (c._id === id ? { ...c, ...formValues } : c))
        );
      } catch (err) {
        Swal.fire("Error!", "Failed to update club", "error");
      }
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/clubs/${id}`);
          Swal.fire("Deleted!", res.data.message, "success");
          setClubs((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
          Swal.fire("Error!", "Failed to delete club", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-semibold">
        Loading your clubs...
      </div>
    );
  }

  if (!clubs.length) {
    return (
      <div className="text-center py-20 text-gray-400 font-semibold">
        You haven't joined any clubs yet.
      </div>
    );
  }

  return (
    <div className="p-6  grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white/50  backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 transition-transform transform hover:scale-[1.03] hover:shadow-3xl hover:border-indigo-300 duration-300"
        >
          {/* Header */}
          <div className="flex  items-center gap-4 mb-4">
            <img
              src={club.logoUrl}
              alt={club.clubName}
              className="w-16 h-16 rounded-xl border border-gray-200 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h2 className="text-xl font-bold text-indigo-700">
                {club.clubName}
              </h2>
              <p className="text-gray-500 text-sm font-medium">
                {club.clubType.toUpperCase()} Club
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {club.description}
          </p>

          {/* Club Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="block font-medium text-gray-500">Location</span>
              <p className="font-semibold text-gray-700">{club.location}</p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">
                Established
              </span>
              <p className="font-semibold text-gray-700">
                {new Date(club.establishmentDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">Members</span>
              <p className="font-semibold text-gray-700">{club.totalMembers}</p>
            </div>
            <div>
              <span className="block font-medium text-gray-500">
                Monthly Fee
              </span>
              <p className="font-semibold text-gray-700">
                ৳ {club.monthlyCharge}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${
                club.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {club.isPublished ? "Published" : "Unpublished"}
            </span>
            <span className="text-xs text-gray-400">
              Approved: {new Date(club.approvedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Update & Delete Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleUpdate(club._id)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(club._id)}
              className="flex-1 bg-red-500 text-white py-2 rounded-full hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyClub;
