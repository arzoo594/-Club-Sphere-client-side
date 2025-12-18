import React from "react";
import Banner from "../Components/Banner";
import ClubsBanner from "./ClubsBanner";
import HomeEvent from "./HomeEvent";
import LifeImpactSection from "../Components/LifeImpactSection";
import EventSlider from "../Components/EventSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <EventSlider></EventSlider>
      <ClubsBanner></ClubsBanner>
      <HomeEvent></HomeEvent>
      <LifeImpactSection></LifeImpactSection>
    </div>
  );
};

export default Home;
