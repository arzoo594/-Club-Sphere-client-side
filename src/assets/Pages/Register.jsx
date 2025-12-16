import React, { useContext } from "react";
import logo from "../Images/Club Sphere.png";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created successfully.",
                confirmButtonText: "OK",
              });
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="min-h-screen text-black my-8 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="card bg-white w-full max-w-md shadow-2xl p-6 rounded-2xl">
              <h1 className="text-4xl text-center text-secondary font-bold mb-6">
                Register now
              </h1>

              <div className="card-body p-0">
                <form onSubmit={handleSubmit(handleRegistration)}>
                  <fieldset className="space-y-4">
                    <div>
                      <label className="label font-semibold">Photo</label>
                      <input
                        type="file"
                        {...register("photo", {
                          required: "Photo is required",
                        })}
                        className="file-input w-full"
                      />
                      {errors.photo && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.photo.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label font-semibold">Name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter your Name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label font-semibold">Email</label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="input input-bordered w-full"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label font-semibold">Password</label>
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                            message:
                              "Password must contain uppercase, lowercase, number, and special character",
                          },
                        })}
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="text-left">
                      <a className="link link-hover text-sm">
                        Forgot password?
                      </a>
                    </div>

                    <button className="btn text-2xl text-secondary font-extrabold bg-primary w-full mt-4">
                      Register
                    </button>

                    <p>
                      Already have an account? Please{" "}
                      <Link to="/login" className="text-secondary font-bold">
                        Login
                      </Link>
                    </p>
                    <SocialLogin />
                  </fieldset>
                </form>
              </div>
            </div>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <img
              className="w-[420px] rounded-2xl border p-6 shadow-lg"
              src={logo}
              alt="Club Sphere"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
