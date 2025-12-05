import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6">
      <div className="w-11/12 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* About Section */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-white mb-2">ClubSphere</h2>
            <p className="text-gray-400 text-sm">
              Discover, join, and manage local clubs easily. Your hub for
              communities and events.
            </p>
          </div>

          {/* Quick Links & Dashboard */}
          <div className="md:w-1/3 grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-white">
                    Clubs
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-white">
                    Events
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>
                  <a href="" className="hover:text-white">
                    Member
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-white">
                    Manager
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-white">
                    Admin
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:w-1/3">
            <h3 className="font-semibold mb-2">Connect with us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-6 h-6 hover:text-white" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6 hover:text-white" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8"></div>

        {/* Copyright */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ClubSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
