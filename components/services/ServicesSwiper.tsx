"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { services } from "@/data/profileServices";
import ServiceCard from "@/components/cards/ServiceCard";

const ServicesSwiper = () => {
  return (
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
        <SwiperSlide key={index} className="pb-10">
          <ServiceCard
            title={service.title}
            warranty={service.warranty}
            country={service.country}
            imageSrc={service.imageSrc}
            book={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServicesSwiper;
