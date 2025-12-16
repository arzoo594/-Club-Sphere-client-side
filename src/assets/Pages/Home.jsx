import React from "react";
import Banner from "../Components/Banner";
import ClubsBanner from "./ClubsBanner";
import HomeEvent from "./HomeEvent";
import HomeEventSlider from "./HomeEventSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ClubsBanner></ClubsBanner>
      <HomeEvent></HomeEvent>
      <HomeEventSlider></HomeEventSlider>
    </div>
  );
};

export default Home;
