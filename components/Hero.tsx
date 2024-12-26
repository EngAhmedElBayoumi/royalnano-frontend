"use client";
import CustomButton from "./formFields/CustomButton";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Hero = () => {
  const slides = [
    {
      title: "How can we help you?",
      description:
        "We’re here to help and answer any questions you might have. We look forward to hearing from you!",
      image: "/assets/images/hero/multiple-car.png",
    },
    {
      title: "Royal Nano Ceramic",
      description:
        "Royal Nano Ceramic is a leading car protection company in Egypt, offering advanced nano ceramic coatings to protect and enhance vehicle exteriors. They specialize in paint protection, scratch resistance, and hydrophobic coatings, ensuring cars remain in top condition.",
      image: "/assets/images/hero/race-car.png",
    },
  ];

  return (
    <Swiper
      className="relative h-[580px] text-white top-[-160px]"
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="bg-cover bg-center h-full"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, rgba(0, 0, 0, 0.77) 100%),url(${slide.image})`,
          }}
        >
          <div className="flex justify-center h-full">
            <main className="main-container flex flex-col justify-center items-start h-full">
              <h2 className="mt-16 text-sm sm:text-md lg:text-lg">
                {slide.title}
              </h2>
              <p className="md:text-sm lg:text-md max-w-[800px]">
                {slide.description}
              </p>
              <CustomButton
                text="Protect Your Car"
                className="text-white mt-4 rounded-2xl text-[14px] sm:text-sm lg:text-md px-6"
              />
            </main>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
