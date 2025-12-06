import React from "react";
import logo from "../Images/Club Sphere.png";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  return (
    <div className="min-h-screen my-8 flex items-center justify-center bg-white px-10">
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
            <h1 className="text-4xl text-center text-secondary  font-bold mb-6">
              Login now
            </h1>

            <div className="card-body p-0">
              <fieldset className="space-y-4">
                <div>
                  <label className="label font-semibold">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="label font-semibold">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="text-left">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>

                <button className="btn text-2xl text-secondary font-extrabold bg-primary w-full mt-4">
                  Login
                </button>
                <p>
                  Dont have an account?Please{" "}
                  <Link to="/register" className="text-secondary font-bold">
                    Register
                  </Link>
                </p>
                <SocialLogin from={from} navigate={navigate}></SocialLogin>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
