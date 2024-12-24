"use client";
import React from "react";
import ServiceItem from "./ServiceItem";
import useActiveService from "./useActiveService";
import { services } from "../../data/servicesData";

const OurServices = () => {
  const { activeService, handleMouseEnter } = useActiveService(services[0]);

  return (
    <section className="pb-8 bg-white relative top-[-100px]">
      <h2 className="text-center text-lg font-bold text-primary">
        Our Services
      </h2>
      <div className="flex justify-center">
        <main className="main-container grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[10%] items-center">
          <ul className="space-y-4">
            {services.map((service, index) => (
              <ServiceItem
                key={index}
                service={service}
                isActive={activeService.name === service.name}
                onMouseEnter={() => handleMouseEnter(service)}
              />
            ))}
          </ul>
          {/* eslint-disable */}
          <img
            src={activeService.image}
            alt={activeService.name}
            className="rounded-lg h-[400px] w-full"
          />
        </main>
      </div>
    </section>
  );
};

export default OurServices;
