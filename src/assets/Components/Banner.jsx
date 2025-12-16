// import React from "react";
// import { GridScan } from "./GridScan";
// import TextTypee from "./TextTypee";
// import PixelBlast from "./createTouchTexture";

// const Banner = () => {
//   return (
//     <div>
//       <div className="relative  my-8 w-full min-h-[420px]">
//         {/* GridScan Background */}

//         {/* Centered Text + Buttons */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 py-6 px-4">
//           {/* Centered Headline */}
//           <TextTypee />
//           {/* Responsive Text + Buttons */}
//           <p className="text-purple-300 font-semibold">
//             ClubSphere is a modern and user-friendly platform that helps manage
//             clubs, events, <br /> and managers in a simple and smart way. <br />{" "}
//             Through this platform, users can discover clubs, participate in
//             events, <br /> and create their own clubs or events.
//           </p>
//           <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center">
//             <div className="flex items-center gap-2">
//               <span className="text-purple-300 font-medium">
//                 Explore Clubs →
//               </span>
//               <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded-lg hover:bg-blue-700 transition">
//                 Clubs
//               </button>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-purple-300 font-medium">
//                 Explore Events →
//               </span>
//               <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded-lg hover:bg-green-600 transition">
//                 Events
//               </button>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-purple-300 font-medium">
//                 Become a Manager →
//               </span>
//               <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded-lg hover:bg-pink-600 transition">
//                 Be A Manager
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
// import React from "react";
// // GridScan, TextTypee, PixelBlast কম্পোনেন্টগুলো অপরিবর্তিত থাকল

// import TextTypee from "./TextTypee";

// // হাইলাইট করার জন্য একটি গ্লোয়িং বাটন স্টাইল
// const GradientButton = ({ children, hoverClass, Icon }) => (
//   <button
//     className={`
//       px-6 py-3 font-bold text-lg
//       bg-purple-600 text-white rounded-full
//       shadow-lg hover:shadow-purple-700/50
//       transition-all duration-300 ease-in-out
//       transform hover:scale-[1.02]
//       ${hoverClass}
//       flex items-center justify-center space-x-2
//     `}
//   >
//     {Icon && <span className="w-5 h-5">{Icon}</span>}
//     <span>{children}</span>
//   </button>
// );

// const Banner = () => {
//   return (
//     <div className="bg-gray-900 border-b-2 border-purple-800 shadow-xl">
//       <div className="relative my-12  w-full min-h-[500px] max-w-7xl mx-auto overflow-hidden rounded-xl">
//         <div className="absolute inset-0 opacity-20"></div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 py-8 px-4">
//           <h1 className="text-5xl md:text-4xl font-extrabold text-white leading-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
//               Unlock Your Club's
//             </span>
//             <br />
//             Potential
//           </h1>
//           <TextTypee />

//           <p className="text-xl text-purple-200 max-w-4xl font-light">
//             ClubSphere is a modern and user-friendly platform that helps manage
//             clubs, events, and managers in a simple and smart way. Through this
//             platform, users can discover clubs, participate in events, and
//             create their own clubs or events.
//           </p>

//           <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 items-center mt-6">
//             {/* Explore Clubs Button */}
//             <GradientButton
//               hoverClass="hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500"
//               Icon={
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0H4.5Z"
//                   />
//                 </svg>
//               }
//             >
//               Explore Clubs
//             </GradientButton>

//             <GradientButton
//               hoverClass="hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500"
//               Icon={
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
//                   />
//                 </svg>
//               }
//             >
//               Explore Events
//             </GradientButton>

//             <GradientButton
//               hoverClass="hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500"
//               Icon={
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 3a.75.75 0 0 0-.75.75V5.25c0 .414.336.75.75.75s.75-.336.75-.75V3.75A.75.75 0 0 0 12 3ZM12 21a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75s.75-.336.75-.75v-1.5a.75.75 0 0 0-.75-.75ZM12 12a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9.813 15.368a12.185 12.185 0 0 0-1.077 4.14 1.5 1.5 0 0 1-2.983-.356 1.5 1.5 0 0 1 .356-2.983c1.233-.306 2.502-.544 3.813-.674"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.187 15.368c1.31-.13 2.579-.368 3.813-.674a1.5 1.5 0 0 1 .356 2.983 1.5 1.5 0 0 1-2.983.356 12.185 12.185 0 0 0-1.077-4.14"
//                   />
//                 </svg>
//               }
//             >
//               Be A Manager
//             </GradientButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
import React from "react";
import TextTypee from "./TextTypee";
import Clubs from "../Pages/Clubs";

// Gradient Button
const GradientButton = ({ children, hoverClass, Icon }) => (
  <button
    className={`
      px-6 py-3 font-semibold text-lg 
      bg-gradient-to-r from-purple-600 to-pink-600 
      text-white rounded-full 
      shadow-xl hover:shadow-purple-700/50 
      transition-all duration-300 ease-in-out 
      transform hover:scale-105 
      ${hoverClass}
      flex items-center justify-center space-x-2
    `}
  >
    {Icon && <span className="w-5 h-5">{Icon}</span>}
    <span>{children}</span>
  </button>
);

const Banner = () => {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d0b59] to-[#0f172a]"></div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-60 bg-purple-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-60 bg-pink-600/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto min-h-[600px] flex flex-col items-center justify-center text-center px-4 py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Unlock Your Club's
          </span>
          <br />
          Potential
        </h1>

        {/* Typing Text */}
        <div className="mt-4">
          <TextTypee />
        </div>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-purple-200 max-w-4xl font-light">
          ClubSphere is a modern and user-friendly platform to manage clubs,
          events, and managers effortlessly. Discover clubs, join events, or
          create your own community in one smart platform.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <GradientButton hoverClass="hover:from-blue-500 hover:to-indigo-500">
            Explore Clubs
          </GradientButton>

          <GradientButton hoverClass="hover:from-green-500 hover:to-teal-500">
            Explore Events
          </GradientButton>

          <GradientButton hoverClass="hover:from-orange-500 hover:to-red-500">
            Be A Manager
          </GradientButton>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Banner;
