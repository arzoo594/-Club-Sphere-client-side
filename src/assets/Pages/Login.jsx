import React, { useContext } from "react";
import logo from "../Images/Club Sphere.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import SocialLogin from "./SocialLogin";
import { AuthContext } from "../Contexts/AuthContext";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen text-black my-8 flex items-center justify-center bg-white px-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            className="w-[420px] rounded-2xl border p-6 shadow-lg"
            src={logo}
            alt="Club Sphere"
          />
        </div>

        <div className="flex justify-center">
          <div className="card bg-white w-full max-w-md shadow-2xl p-6 rounded-2xl">
            <h1 className="text-4xl text-center text-secondary font-bold mb-6">
              Login now
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="label font-semibold">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button className="btn text-2xl text-secondary font-extrabold bg-primary w-full mt-4">
                Login
              </button>

              <p className="text-center">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-secondary font-bold">
                  Register
                </Link>
              </p>

              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
