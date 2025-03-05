"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "@/components/cards/ReviewCard";
import { useGetCustomerReviewQuery } from "@/redux/services/website/customerReviewApi";

const CustomerReviews: React.FC = () => {
  const { data: reviews, isLoading, error } = useGetCustomerReviewQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;

  return (
    <section className="py-4 lg:py-6 xl:py-8 bg-white">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary mb-6">
        Customer Reviews
      </h2>
      <div className="flex justify-center">
        <Swiper
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2, 
            },
            992: {
              slidesPerView: 3, 
            },
            1200: {
              slidesPerView: 4, 
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (_, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Autoplay, Pagination]}
          className="main-container"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard
                name={review.name}
                rating={review.rating}
                comment={review.review}
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