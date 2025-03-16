"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ServiceCard from "@/components/cards/ServiceCard";

const AllServices = () => {
  const t = useTranslations("website.services");
  const { data, isLoading, error } = useGetServicesQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    }
    if ("error" in error) {
      return <div>Error: {error.error}</div>;
    }
    return <div>An error occurred</div>;
  }

  return (
    <section className="pb-8 bg-white relative top-[-100px] animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        {t("title")}
      </h2>
      <Swiper
        spaceBetween={30}
        breakpoints={{
          768: {
            slidesPerView: 2, // 2 slides on medium screens
          },
          992: {
            slidesPerView: 3, // 3 slides on larger screens
          },
          1200: {
            slidesPerView: 4, // 4 slides on extra large screens
          },
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
        className="main-container"
      >
        {data?.results?.map(
          (service: {
            name: string;
            id: number;
            alias: string;
            image: string;
          }) => (
            <SwiperSlide key={service?.id} className="pb-10">
              <ServiceCard
                title={service.name}
                alias={service.alias}
                imageSrc={service.image}
                book={true}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default AllServices;
