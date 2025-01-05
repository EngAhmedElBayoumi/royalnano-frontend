"use client";
import Image from "next/image";
import React from "react";
import { AboutData } from "../../data/aboutData";
import IconWithTitle from "./IconWithTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const About = ({ showTitle }: { showTitle: boolean }) => {
  return (
    <section
      className={` ${
        showTitle ? "py-4 lg:py-6 xl:py-8" : "py-0"
      } bg-white animate-on-scroll`}
    >
      <h2
        className={` ${
          showTitle
            ? "text-center text-md lg:text-lg xl:text-xl font-bold text-primary"
            : "hidden"
        } `}
      >
        About
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
              Why Royal Nano
            </p>
            {AboutData.map((data) => (
              <IconWithTitle
                key={data.title}
                paragraph={data.paragraph}
                src={data.src}
                title={data.title}
              />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default About;
