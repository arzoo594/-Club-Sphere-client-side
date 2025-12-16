import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../Images/Club Sphere.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-purple-200">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a0033] to-[#2d0b59]"></div>

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"></div>

      <div className="relative w-11/12 mx-auto max-w-7xl pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="ClubSphere"
                className="w-12 h-12 rounded-full border border-purple-500"
              />
              <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                ClubSphere
              </h2>
            </div>
            <p className="mt-4 text-sm text-purple-300 leading-relaxed">
              Discover, join, and manage clubs effortlessly. ClubSphere is your
              ultimate hub for communities, events, and leadership.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {["Home", "Clubs", "Events"].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="hover:text-white transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Dashboard</h3>
              <ul className="space-y-2 text-sm">
                {["Member", "Manager", "Admin"].map((role) => (
                  <li key={role}>
                    <a href="#" className="hover:text-white transition">
                      {role}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-3">Connect with us</h3>
            <div className="flex gap-4 mt-2">
              <a className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition">
                <FaGithub className="w-5 h-5" />
              </a>
              <a className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-700/40 my-8"></div>

        {/* Copyright */}
        <p className="text-center text-sm text-purple-400">
          © {new Date().getFullYear()} ClubSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
