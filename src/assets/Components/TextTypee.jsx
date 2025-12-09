import React from "react";
import TextType from "./TextType";

const TextTypee = () => {
  return (
    <div>
      <TextType
        className="text-purple-300 font-bold text-2xl"
        text={[
          "Welcome to ClubSphere",
          "Discover, join, and manage clubs easily.",
          "Join thousands of club enthusiasts today!",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
      />
    </div>
  );
};

export default TextTypee;
