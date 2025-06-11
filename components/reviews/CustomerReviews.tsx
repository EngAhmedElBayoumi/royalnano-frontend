"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "@/components/cards/ReviewCard";
import { useGetAllReviewsQuery } from "@/redux/services/website/customerReviewApi";
import LoadingError from "@/components/dashboard/LoadingError";
import ReviewsSkeleton from "./ReviewsSkeleton";
import { useTranslations } from "next-intl";

interface CustomerReview {
  id: number;
  name: string;
  rating: number;
  review: string;
  image: string;
}

const CustomerReviews: React.FC = () => {
  const t = useTranslations("website.CustomerReviews");
  const { data: reviews, isLoading, error } = useGetAllReviewsQuery({});

  return (
    <section className="py-4 lg:py-6 xl:py-8 bg-white">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary mb-6">
        {t("heading")}
      </h2>
      <div className="flex justify-center">
        {error ? (
          <LoadingError />
        ) : isLoading ? (
          <ReviewsSkeleton />
        ) : (
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
            {reviews?.map((review: CustomerReview) => (
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
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
