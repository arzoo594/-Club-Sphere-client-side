import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateClub = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const clubData = {
      clubName: data.clubName,
      clubType: data.clubType,
      description: data.description,
      email: data.email,
      establishmentDate: data.establishmentDate,
      location: data.location,
      logoUrl: data.logoUrl,
      name: data.name,
      totalMembers: data.totalMembers,

      monthlyCharge: data.monthlyCharge,
    };

    axiosSecure.post("/club-requests", clubData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: `${data.clubName} club creation request sent successfully. It is now awaiting admin approval.`,
          showConfirmButton: false,
          timer: 3000,
        });
        reset();
      } else if (res.data.message) {
        Swal.fire({
          icon: "warning",
          title: "Submission Failed",
          text: res.data.message,
        });
      }
    });
  };
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Create New Club 🏟️
      </h2>

      <div className="bg-base-100 p-8 rounded-xl shadow-xl border border-base-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Club Name
                </span>
              </label>
              <input
                type="text"
                {...register("clubName", { required: true })}
                placeholder="ClubSphere"
                className="input input-bordered w-full"
              />
              {errors.clubName && (
                <p className="text-red-500 text-sm">Club Name is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Club Type
                </span>
              </label>
              <select
                {...register("clubType", { required: true })}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="sports">Sports</option>
                <option value="gaming">Gaming</option>
                <option value="cultural">Cultural</option>
                <option value="educational">Educational</option>
                <option value="social">Social / Volunteer</option>
                <option value="tech">Tech</option>
              </select>
              {errors.clubType && (
                <p className="text-red-500 text-sm">Club Type is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Location / Address
                </span>
              </label>
              <input
                type="text"
                {...register("location", { required: true })}
                name="location"
                placeholder="Dhaka, Bangladesh"
                className="input input-bordered w-full"
                required
              />
              {errors.location && (
                <p className="text-red-500 text-sm">Location is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Establishment Date
                </span>
              </label>
              <input
                {...register("establishmentDate", { required: true })}
                type="date"
                name="establishmentDate"
                className="input input-bordered w-full"
                required
              />
              {errors.date && (
                <p className="text-red-500 text-sm">
                  EstablishmentDate is required
                </p>
              )}
            </div>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold text-secondary">
                Short Club Description
              </span>
            </label>
            <textarea
              {...register("description", { required: true, maxLength: 500 })}
              name="description"
              placeholder="Write a detailed description of your club (max 500 characters)..."
              className="textarea textarea-bordered h-32"
              maxLength="500"
              required
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          <div className="divider text-gray-500">Contact & Media</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Contact Email
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                defaultValue={user.email}
                placeholder="contact@club.com"
                className="input input-bordered w-full"
                readOnly
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Club Logo URL
                </span>
              </label>
              <input
                type="url"
                {...register("logoUrl", { required: true })}
                name="logoUrl"
                placeholder="https://example.com/logo.png"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Total Members (Approx.)
                </span>
              </label>
              <input
                {...register("totalMembers", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                })}
                type="number"
                name="totalMembers"
                placeholder="100"
                className="input input-bordered w-full"
              />
              {errors.totalMembers && (
                <p className="text-red-500 text-sm">
                  Total Members must be a positive number
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Monthly Membership Charge ($)
                </span>
              </label>
              <input
                {...register("monthlyCharge", {
                  required: true,

                  min: 0,
                })}
                type="number"
                name="monthlyCharge"
                placeholder="50"
                className="input input-bordered w-full"
                required
              />
              {errors.monthlyCharge && (
                <p className="text-red-500 text-sm">
                  Charge must be a non-negative number and is required
                </p>
              )}
            </div>
            {/* ---------------------------------------------------- */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-secondary">
                  Manager Name
                </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={user.displayName}
                placeholder="Manager Name"
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
          </div>

          <div className="form-control mt-10">
            <button
              type="submit"
              className="btn btn-primary text-white font-bold text-lg"
            >
              Submit Club Creation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClub;
