"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Hero from "@/components/Hero";
import OurServices from "@/components/services/OurServices";
import { services } from "@/data/profileServices";
import ServiceCard from "@/components/cards/ServiceCard";

// export const metadata = {
//   title: "Services | Royal Nano",
//   description: "Service  page",
// };
export default function Services() {
  return (
    <>
      <Hero />
      <OurServices />

      <section className="pb-8 bg-white relative top-[-100px]">
        <h2 className="text-center text-lg font-bold text-primary">
          Nano ceramic products
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
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <ServiceCard
                title={service.title}
                warranty={service.warranty}
                country={service.country}
                imageSrc={service.imageSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
