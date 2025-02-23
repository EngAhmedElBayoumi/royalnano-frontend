"use client";
import CustomButton from "./formFields/CustomButton";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('website.hero'); 

  const slides = [
    {
      title: t('slide1.title'), 
      description: t('slide1.description'), 
      image: "/assets/images/hero/multiple-car.png",
    },
    {
      title: t('slide2.title'), 
      description: t('slide2.description'), 
      image: "/assets/images/hero/race-car.png",
    },
  ];

  return (
    <Swiper
      className="relative h-[70vh] text-white top-[-125px]"
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
              <h2 className="mt-16 text-md lg:text-lg xl:text-xl">
                {slide.title}
              </h2>
              <p className="md:text-sm xl:text-md lg:w-[45%]">
                {slide.description}
              </p>
              <CustomButton
                text={t('buttonText')} 
                className="text-white mt-4 rounded-xl xl:rounded-2xl text-[14px] md:text-sm xl:text-md py-1 xl:py-2 px-4 xl:px-6"
              />
            </main>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;