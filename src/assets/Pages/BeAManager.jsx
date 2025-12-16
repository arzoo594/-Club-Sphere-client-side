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
    <div className="relative min-h-screen overflow-hidden my-12 px-4 md:px-6">
      {/* Background shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]" />
      <div className="absolute top-24 left-10 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto py-14">
        {/* Form container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 backdrop-blur-xl border border-purple-700/40 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              Apply to Be a Club Manager 🌟
            </h2>
            <p className="text-purple-200 text-sm md:text-base">
              Fill out the form accurately. Admin will review your application.
            </p>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Full Name
                </span>
              </label>
              <input
                value={user?.displayName}
                {...register("name", { required: true })}
                className="input input-bordered w-full bg-purple-100/20 cursor-not-allowed text-white"
                readOnly
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Email
                </span>
              </label>
              <input
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-purple-100/20 cursor-not-allowed text-white"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Phone Number
                </span>
              </label>
              <input
                {...register("phone", { required: true })}
                className="input input-bordered w-full bg-white/10 text-white placeholder-purple-300"
                placeholder="01XXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">
                  Phone number is required
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Date of Birth
                </span>
              </label>
              <input
                type="date"
                {...register("dob", { required: true })}
                className="input input-bordered w-full bg-white/10 text-white"
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Current Address
                </span>
              </label>
              <input
                {...register("address", { required: true })}
                className="input input-bordered w-full bg-white/10 text-white"
                placeholder="District, Area"
              />
            </div>
          </div>

          {/* Club Details */}
          <div className="border-t border-purple-700/40 pt-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">
              Club Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 font-semibold">
                    Club Name
                  </span>
                </label>
                <input
                  {...register("clubName", { required: true })}
                  className="input input-bordered w-full bg-white/10 text-white"
                  placeholder="Club Name"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 font-semibold">
                    Club Type
                  </span>
                </label>
                <select
                  {...register("clubType", { required: true })}
                  className="select select-bordered w-full bg-white/10 text-white"
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
                  <p className="text-red-400 text-sm mt-1">Select club type</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 font-semibold">
                    Established Year
                  </span>
                </label>
                <input
                  type="number"
                  {...register("establishedYear", { required: true })}
                  className="input input-bordered w-full bg-white/10 text-white"
                  placeholder="YYYY"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 font-semibold">
                    Total Members
                  </span>
                </label>
                <input
                  type="number"
                  {...register("totalMembers", { required: true })}
                  className="input input-bordered w-full bg-white/10 text-white"
                  placeholder="Approximate Members"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-purple-300 font-semibold">
                    NID Number
                  </span>
                </label>
                <input
                  {...register("nidNumber", { required: true })}
                  className="input input-bordered w-full bg-white/10 text-white"
                  placeholder="Enter NID Number"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Previous Experience?
                </span>
              </label>
              <select
                {...register("hasExperience", { required: true })}
                className="select select-bordered w-full bg-white/10 text-white"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {hasExperience === "yes" && (
            <div className="form-control my-4">
              <label className="label">
                <span className="label-text font-semibold text-purple-300">
                  Experience Details
                </span>
              </label>
              <textarea
                {...register("experienceDetails")}
                className="textarea textarea-bordered h-24 bg-white/10 text-white"
                placeholder="Describe your previous club management experience"
              />
            </div>
          )}

          {/* Motivation */}
          <div className="form-control my-4">
            <label className="label">
              <span className="label-text font-semibold text-purple-300">
                Motivation
              </span>
            </label>
            <textarea
              {...register("motivation", { required: true })}
              className="textarea textarea-bordered h-32 bg-white/10 text-white"
              placeholder="Why do you want to be a Club Manager?"
            />
            {errors.motivation && (
              <p className="text-red-400 text-sm mt-1">
                Motivation is required
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="form-control my-4">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="checkbox checkbox-primary"
              />
              <span className="text-purple-200">
                I agree to the terms & conditions
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-400 text-sm mt-1">
                You must agree to terms
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control my-4">
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all"
            >
              Submit Request ✅
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeAManager;
