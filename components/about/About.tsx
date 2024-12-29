"use client";
import Image from "next/image";
import React from "react";
import { AboutData } from "../../data/aboutData";
import IconWithTitle from "./IconWithTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
const About = () => {
  return (
    <section className="py-8 bg-white ">
      <h2 className="text-center text-lg font-bold text-primary">About</h2>
      <div className="flex  justify-center">
        <main className="main-container grid grid-cols-1 xl:grid-cols-2 items-center ">
          <div className="w-full sm:w-[90%] md:w-[637px] mx-auto">
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
              <SwiperSlide>
                <Image
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  width={637}
                  height={513}
                  alt="aboutImg"
                  src="/assets/images/about.png"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div>
            <p className="text-lg text-secondary">Why Royal Nano</p>
            {AboutData.map((data) => (
              <IconWithTitle
                key={data.title}
                paragraph={data.paragraph}
                src={data.src}
                title={data.title}
              />
            ))}
          </div>
          {/* </div> */}
        </main>
      </div>
    </section>
  );
};

export default About;
