"use client";
import React from "react";
import GradientCard from "../cards/GradientCard";
import { OurSolutionsData } from "@/data/OurSolutionsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const OurSolutions = () => {
  return (
    <section className="py-4 lg:py-6 xl:py-8 bg-white animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        Our Solutions
      </h2>
      <div className="flex justify-center ">
        <main className="main-container grid grid-cols-1  ">
          <p className="md:text-sm xl:text-md lg:text-start text-center mb-3 leading-[56.22px] text-gray font-[600]">
            Royal Nano Ceramic offers advanced protection services for vehicles,
            aircraft, boats, and motorcycles in Egypt. Using the best
            international materials and modern nano-ceramic technologies, the
            company ensures top-level protection and quality, delivering a
            unique experience that makes them the leading choice in the market
          </p>
          <div className="lg:flex hidden items-center md:items-start flex-col lg:flex-row gap-7">
            {OurSolutionsData.map((item) => (
              <GradientCard
                paragraph={item.paragraph}
                key={item.title}
                title={item.title}
              />
            ))}
          </div>
          {/* <div className="w-full sm:w-[90%] md:w-[637px] mx-auto hidden sm:flex"> */}
          {/* <div className="w-full sm:w-[90%] md:w-[637px] mx-auto hidden lg:flex"> */}
          <div className="w-full sm:w-[90%] md:w-[637px] mx-auto flex lg:hidden sm:flex">
            {" "}
            <Swiper
              style={{ paddingBottom: "30px" }}
              breakpoints={{
                768: { slidesPerView: 1 },
                992: { slidesPerView: 1 },
                1200: { slidesPerView: 1 },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} custom-bullet"></span>`;
                },
              }}
              modules={[Autoplay, Pagination]}
            >
              {OurSolutionsData.map((item) => (
                <SwiperSlide key={item.title}>
                  <GradientCard
                    paragraph={item.paragraph}
                    key={item.title}
                    title={item.title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </main>
      </div>
    </section>
  );
};

export default OurSolutions;
