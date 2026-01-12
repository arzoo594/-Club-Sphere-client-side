import React from "react";
import Banner from "../Components/Banner";
import ClubsBanner from "./ClubsBanner";
import HomeEvent from "./HomeEvent";
import LifeImpactSection from "../Components/LifeImpactSection";
import EventSlider from "../Components/EventSlider";
import Error from "../Components/Error";
import FAQSection from "../Components/FAQSection";
import TestimonialSection from "../Components/TestimonialSection";
import NewsletterSection from "../Components/NewsletterSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <EventSlider></EventSlider>
      <ClubsBanner></ClubsBanner>
      <HomeEvent></HomeEvent>
      <LifeImpactSection></LifeImpactSection>
      <FAQSection></FAQSection>
      <TestimonialSection></TestimonialSection>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
