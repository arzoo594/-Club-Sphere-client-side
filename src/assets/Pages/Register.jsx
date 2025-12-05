import React from "react";
import logo from "../Images/Club Sphere.png";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div>
      <div className="min-h-screen my-8 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="card bg-white w-full max-w-md shadow-2xl p-6 rounded-2xl">
              <h1 className="text-4xl text-center text-secondary font-bold mb-6">
                Register now
              </h1>

              <div className="card-body p-0">
                <fieldset className="space-y-4">
                  <div>
                    <label className="label font-semibold">Photo</label>
                    <input type="file" className="file-input w-full" />
                  </div>

                  <div>
                    <label className="label font-semibold">Name</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter your Name"
                    />
                  </div>

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

                  <SocialLogin />

                  <button className="btn text-2xl text-secondary font-extrabold bg-primary w-full mt-4">
                    Register
                  </button>

                  <p>
                    Already have an account? Please{" "}
                    <Link to="/login" className="text-secondary font-bold">
                      Login
                    </Link>
                  </p>
                </fieldset>
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
