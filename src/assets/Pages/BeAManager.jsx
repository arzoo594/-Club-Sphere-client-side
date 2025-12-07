import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeAManager = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const hasExperience = watch("hasExperience");

  const onSubmit = async (data) => {
    try {
      const managerData = {
        name: data.name,
        email: user?.email,
        phone: data.phone,
        dob: data.dob,
        address: data.address,
        clubName: data.clubName,
        clubType: data.clubType,
        establishedYear: data.establishedYear,
        totalMembers: data.totalMembers,
        hasExperience: data.hasExperience,
        experienceDetails: data.experienceDetails || "",
        nidNumber: data.nidNumber,
        motivation: data.motivation,
        status: "pending",
        createdAt: new Date(),
      };

      const response = await axiosSecure.post(
        "/club-manager-request",
        managerData
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Admin will review your request soon.",
        });
        reset();
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Requested",
          text: "You have already submitted a request.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            value={user?.displayName}
            {...register("name", { required: true })}
            className="w-full border p-2 rounded"
            readOnly
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            value={user?.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            {...register("phone", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">Phone is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            {...register("dob", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Current Address</label>
          <input
            {...register("address", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="District, Area"
          />
        </div>

        <div>
          <label className="block mb-1">Club Name</label>
          <input
            {...register("clubName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Club Name"
          />
        </div>

        <div>
          <label className="block mb-1">Club Type</label>
          <select
            {...register("clubType", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="sports">Sports</option>
            <option value="gaming">Gaming</option>
            <option value="cultural">Cultural</option>
            <option value="educational">Educational</option>
            <option value="tech">Tech</option>
            <option value="social">Social / Volunteer</option>
          </select>
          {errors.clubType && (
            <p className="text-red-500 text-sm">Select club type</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Club Established Year</label>
          <input
            type="number"
            {...register("establishedYear", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="YYYY"
          />
        </div>

        <div>
          <label className="block mb-1">Total Members</label>
          <input
            type="number"
            {...register("totalMembers", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Approximate Number of Members"
          />
        </div>

        <div>
          <label className="block mb-1">Previous Experience?</label>
          <select
            {...register("hasExperience", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {hasExperience === "yes" && (
          <div>
            <label className="block mb-1">Experience Details</label>
            <textarea
              {...register("experienceDetails")}
              className="w-full border p-2 rounded"
              rows="3"
            />
          </div>
        )}

        <div>
          <label className="block mb-1">NID Number</label>
          <input
            {...register("nidNumber", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter NID Number"
          />
        </div>

        <div>
          <label className="block mb-1">
            Why do you want to be a Club Manager?
          </label>
          <textarea
            {...register("motivation", { required: true })}
            className="w-full border p-2 rounded"
            rows="4"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("terms", { required: true })}
            className="mr-2"
          />
          <span>I agree to the terms & conditions</span>
        </div>

        <button
          type="submit"
          className="w-full bg-primary font-bold text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl text-secondary font-semibold text-center  mb-8">
          Be A Club Manager
        </h2>

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            value={user?.displayName}
            {...register("name", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            readOnly
          />
          {errors.name && (
            <p className="mt-1 text-xs italic text-red-600">Name is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            value={user?.email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            {...register("phone", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-xs italic text-red-600">
              Phone is required
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Current Address
          </label>
          <input
            {...register("address", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            placeholder="District, Area"
          />
        </div>

        {/* Club Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Club Name
          </label>
          <input
            {...register("clubName", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            placeholder="Club Name"
          />
        </div>

        {/* Club Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Club Type
          </label>
          <select
            {...register("clubType", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
          >
            <option value="">Select Type</option>
            <option value="sports">Sports</option>
            <option value="gaming">Gaming</option>
            <option value="cultural">Cultural</option>
            <option value="educational">Educational</option>
            <option value="tech">Tech</option>
            <option value="social">Social / Volunteer</option>
          </select>
          {errors.clubType && (
            <p className="mt-1 text-xs italic text-red-600">Select club type</p>
          )}
        </div>

        {/* Established Year */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Club Established Year
          </label>
          <input
            type="number"
            {...register("establishedYear", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            placeholder="YYYY"
          />
        </div>

        {/* Total Members */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Total Members
          </label>
          <input
            type="number"
            {...register("totalMembers", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            placeholder="Approximate Number of Members"
          />
        </div>

        {/* Previous Experience */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Previous Experience?
          </label>
          <select
            {...register("hasExperience", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Experience Details (Conditional) */}
        {hasExperience === "yes" && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Experience Details
            </label>
            <textarea
              {...register("experienceDetails")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
              rows="3"
              placeholder="Describe your previous club management experience"
            />
          </div>
        )}

        {/* NID Number */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            NID Number
          </label>
          <input
            {...register("nidNumber", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            placeholder="Enter NID Number"
          />
        </div>

        {/* Motivation */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Why do you want to be a Club Manager?
          </label>
          <textarea
            {...register("motivation", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-200"
            rows="4"
            placeholder="Share your motivation and vision"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("terms", { required: true })}
            className="h-4 w-4 accent-blue-600"
          />
          <span className="text-sm text-gray-700">
            I agree to the terms & conditions
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BeAManager;
