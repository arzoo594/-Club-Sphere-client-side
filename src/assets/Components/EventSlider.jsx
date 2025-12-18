import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules import (v10+)
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const EventSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  if (!events.length)
    return (
      <div className="text-center py-20 text-gray-400 font-semibold">
        No upcoming events.
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-purple-400">
        Upcoming Events
      </h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <img
                src={event.imageUrl || "https://via.placeholder.com/800x400"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <p className="text-sm">
                  Hosted by{" "}
                  <span className="font-semibold">{event.clubName}</span>
                </p>
                <p className="text-sm">
                  📍 {event.location} | 🗓{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;
