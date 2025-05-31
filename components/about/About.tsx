"use client";
import Image from "next/image";
import React from "react";
import { AboutData } from "../../data/aboutData";
import IconWithTitle from "./IconWithTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

const About = ({ showTitle }: { showTitle: boolean }) => {
  const t = useTranslations("website.About");

  return (
    <section
      className={` ${
        showTitle ? "py-4 lg:py-6 xl:py-8" : "py-0"
      } bg-white animate-on-scroll transition-all duration-500 ease-in-out`}
    >
      <h2
        className={` ${
          showTitle
            ? "text-center text-md lg:text-lg xl:text-xl font-bold text-primary"
            : "hidden"
        } `}
      >
        {t("heading")}
      </h2>
      <div className="flex justify-center">
        <main className="main-container grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="w-full mx-auto">
            {" "}
            <Swiper
              className="w-full h-full"
              style={{ paddingBottom: "30px" }}
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
            >
              <SwiperSlide className="flex justify-center w-full h-full">
                <Image
                  className="mx-auto"
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center w-full h-full">
                <Image
                  className="mx-auto"
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center w-full h-full">
                <Image
                  className="mx-auto"
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center w-full h-full">
                <Image
                  className="mx-auto"
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div>
            <p className="text-md lg:text-lg xl:text-xl text-secondary">
              {t("whyRoyalNano")}
            </p>
            {AboutData.map((data, index) => (
              <IconWithTitle
                key={t(`aboutData.${index}.title`)} // Use title as key
                paragraph={t(`aboutData.${index}.paragraph`)} // Fetch translated paragraph
                src={data.src}
                title={t(`aboutData.${index}.title`)} // Fetch translated title
              />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default About;
