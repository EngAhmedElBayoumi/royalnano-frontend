"use client";
import React from "react";
import GradientCard from "../cards/GradientCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

const OurSolutions = () => {
  const t = useTranslations("website.OurSolutions");

  const solutionsLength = t.raw("solutions").length;

  return (
    <section className="py-4 lg:py-6 xl:py-8 bg-white animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        {t("heading")}
      </h2>
      <div className="flex justify-center ">
        <main className="main-container grid grid-cols-1  ">
          <p className="md:text-sm xl:text-md lg:text-start text-center mb-3 leading-[56.22px] text-gray font-[600]">
            {t("description")}
          </p>
          <div className="lg:flex hidden items-center md:items-start flex-col lg:flex-row gap-7">
            {Array.from({ length: solutionsLength }).map((_, index) => (
              <GradientCard
                paragraph={t(`solutions.${index}.paragraph`)} 
                key={t(`solutions.${index}.title`)}
                title={t(`solutions.${index}.title`)} 
              />
            ))}
          </div>
          <div className="w-full sm:w-[90%] md:w-[637px] mx-auto flex lg:hidden sm:flex">
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
              {Array.from({ length: solutionsLength }).map((_, index) => (
                <SwiperSlide key={t(`solutions.${index}.title`)}>
                  <GradientCard
                    paragraph={t(`solutions.${index}.paragraph`)} 
                    title={t(`solutions.${index}.title`)} 
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