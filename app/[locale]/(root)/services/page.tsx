import React from "react";
import Hero from "@/components/Hero";
import OurServices from "@/components/services/OurServices";
import ServicesSwiper from "@/components/services/ServicesSwiper";
import Difference from "@/components/services/Difference";

export const metadata = {
  title: "Services | Royal Nano",
  description: "Service  page",
};
export default function Services() {
  return (
    <>
      <Hero />
      <OurServices />

      <section className="pb-8 bg-white relative top-[-100px]">
        <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary mb-3">
          Nano ceramic products
        </h2>
        <ServicesSwiper />
      </section>

      <Difference />

      <section className="pb-8 bg-white relative top-[-100px]">
        <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary mb-3">
          Thermal isolation Products
        </h2>
        <ServicesSwiper />
      </section>
    </>
  );
}
