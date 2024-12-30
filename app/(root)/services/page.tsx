import React from "react";
import Hero from "@/components/Hero";
import OurServices from "@/components/services/OurServices";
import ServicesSwiper from "@/components/services/ServicesSwiper";

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
        <h2 className="text-center text-lg font-bold text-primary">
          Nano ceramic products
        </h2>
        <ServicesSwiper />
      </section>

      <section className="pb-8 bg-white relative top-[-100px]">
        <h2 className="text-center text-lg font-bold text-primary">
          Thermal isolation Products
        </h2>
        <ServicesSwiper />
      </section>
    </>
  );
}
