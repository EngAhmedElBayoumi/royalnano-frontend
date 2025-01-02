"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { reviews } from "../../data/customerReviewsData";
import ReviewCard from "../cards/ReviewCard";
import { useGetAllReviewsQuery } from "@/redux/services/customerReviewApi";

const CustomerReviews: React.FC = () => {
  const [data, { isLoading, isError }] = useGetAllReviewsQuery();
  console.log(data);

  return (
    <section className="py-8 bg-white">
      <h2 className="text-center text-lg font-bold text-primary mb-6">
        Customers
      </h2>
      <div className="flex justify-center">
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
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard
                name={review.name}
                rating={review.rating}
                comment={review.comment}
                image={review.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReviews;
