import React from "react";
import { GridScan } from "./GridScan";
import TextTypee from "./TextTypee";

const Banner = () => {
  return (
    <div>
      <div className="relative bg-black my-8 w-full min-h-[420px]">
        {/* GridScan Background */}
        <GridScan
          sensitivity={0.25}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          className="absolute inset-0"
        />

        {/* Centered Text + Buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 py-6 px-4">
          {/* Centered Headline */}
          <TextTypee />
          {/* Responsive Text + Buttons */}
          <p className="text-purple-300 font-semibold">
            ClubSphere is a modern and user-friendly platform that helps manage
            clubs, events, <br /> and managers in a simple and smart way. <br />{" "}
            Through this platform, users can discover clubs, participate in
            events, <br /> and create their own clubs or events.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center">
            <div className="flex items-center gap-2">
              <span className="text-purple-300 font-medium">
                Explore Clubs →
              </span>
              <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded-lg hover:bg-blue-700 transition">
                Clubs
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-300 font-medium">
                Explore Events →
              </span>
              <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded-lg hover:bg-green-600 transition">
                Events
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-300 font-medium">
                Become a Manager →
              </span>
              <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded-lg hover:bg-pink-600 transition">
                Be A Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
