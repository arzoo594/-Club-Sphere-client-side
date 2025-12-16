import React, { useState } from "react";
import MyClubsMember from "../Pages/MyClubsMember";
import MemberEvents from "../Pages/MemberEvents";

// Placeholder for empty states
const NotFoundPlaceholder = ({ title, message, actionText }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-2xl border-t-4 border-purple-500 transform transition duration-500 hover:shadow-3xl">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-purple-500 mb-4 animate-pulse"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{title}</h2>
    <p className="text-gray-600 mb-8 text-center">{message}</p>
    {actionText && (
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105">
        {actionText}
      </button>
    )}
  </div>
);

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("clubs");

  const renderContent = () => {
    switch (activeTab) {
      case "clubs":
        return <MyClubsMember />;
      case "events":
        return <MemberEvents />;
      default:
        return (
          <NotFoundPlaceholder
            title="Tab Not Found"
            message="The selected tab does not exist."
          />
        );
    }
  };

  const getTabClasses = (tabName) => {
    const baseClasses =
      "py-3 px-6 text-lg font-semibold transition duration-300 ease-in-out border-b-4 rounded-t-lg transform";
    return activeTab === tabName
      ? `${baseClasses} text-purple-700 border-purple-500 bg-purple-50/50 shadow-inner`
      : `${baseClasses} text-gray-600 border-transparent hover:text-purple-600 hover:bg-gray-100 hover:scale-105`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-800 mb-8 border-b-4 border-purple-500 pb-3 inline-block">
        <span className="text-purple-600 mr-3">👤</span> Member Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-start space-x-0 sm:space-x-2 mb-6">
        <button
          className={getTabClasses("clubs")}
          onClick={() => setActiveTab("clubs")}
        >
          My Joined Clubs
        </button>
        <button
          className={getTabClasses("events")}
          onClick={() => setActiveTab("events")}
        >
          My Joined Events
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 min-h-[300px] transition-all duration-500 hover:shadow-3xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default MemberDashboard;
