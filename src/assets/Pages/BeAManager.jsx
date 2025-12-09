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
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full bg-base-100 shadow-xl border border-primary/20 p-6 md:p-10 space-y-6"
      >
        <h2 className="text-3xl text-center font-extrabold text-primary mb-2">
          Apply to Be a Club Manager 🌟
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Please fill out the form with accurate information. Your application
          will be reviewed by the Admin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Full Name
              </span>
            </label>
            <input
              value={user?.displayName}
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              readOnly
            />
            {errors.name && (
              <p className="label-text-alt text-error mt-1">Name is required</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-secondary">Email</span>
            </label>
            <input
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Phone Number
              </span>
            </label>
            <input
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <p className="label-text-alt text-error mt-1">
                Phone number is required
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Date of Birth
              </span>
            </label>
            <input
              type="date"
              {...register("dob", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Current Address
              </span>
            </label>
            <input
              {...register("address", { required: true })}
              className="input input-bordered w-full"
              placeholder="District, Area"
            />
          </div>
        </div>

        <div className="divider text-lg font-semibold text-gray-500">
          Club Details
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Club Name
              </span>
            </label>
            <input
              {...register("clubName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Club Name"
            />
          </div>

          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Club Type
              </span>
            </label>
            <select
              {...register("clubType", { required: true })}
              className="select select-bordered w-full"
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
              <p className="label-text-alt text-error mt-1">Select club type</p>
            )}
          </div>

          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Established Year
              </span>
            </label>
            <input
              type="number"
              {...register("establishedYear", { required: true })}
              className="input input-bordered w-full"
              placeholder="YYYY"
            />
          </div>

          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Total Members
              </span>
            </label>
            <input
              type="number"
              {...register("totalMembers", { required: true })}
              className="input input-bordered w-full"
              placeholder="Approximate Number of Members"
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                NID Number
              </span>
            </label>
            <input
              {...register("nidNumber", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter NID Number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Previous Experience?
              </span>
            </label>
            <select
              {...register("hasExperience", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="hidden md:block"></div>
        </div>

        {hasExperience === "yes" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-secondary">
                Experience Details
              </span>
            </label>
            <textarea
              {...register("experienceDetails")}
              className="textarea textarea-bordered h-24"
              placeholder="Describe your previous club management experience"
            />
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-secondary">
              Why do you want to be a Club Manager? (Motivation)
            </span>
          </label>
          <textarea
            {...register("motivation", { required: true })}
            className="textarea textarea-bordered h-32"
            placeholder="Share your motivation and vision"
          />
          {errors.motivation && (
            <p className="label-text-alt text-error mt-1">
              Motivation is required
            </p>
          )}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
              className="checkbox checkbox-primary"
            />
            <span className="label-text text-base text-gray-700">
              I agree to the terms & conditions
            </span>
          </label>
          {errors.terms && (
            <p className="label-text-alt text-error">
              Agreement to terms is required
            </p>
          )}
        </div>

        <div className="form-control mt-8">
          <button
            type="submit"
            className="btn btn-primary text-white text-lg hover:btn-secondary"
          >
            Submit Request ✅
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeAManager;
