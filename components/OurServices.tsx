"use client";

import React, { useState } from "react";

type Service = {
  name: string;
  type: string;
  image: string;
};

const services: Service[] = [
  {
    name: "Max Pro",
    type: "Paint Protection",
    image: "/assets/images/max-pro.png",
  },
  {
    name: "Graphene Hybrid Plus",
    type: "Nano Graphene",
    image: "/assets/images/graphene-hybrid.png",
  },
  {
    name: "Diamond Hybrid Plus",
    type: "Nano Ceramic",
    image: "/assets/images/diamond-hybrid.png",
  },
  {
    name: "Shield UltraCool",
    type: "Thermal Insulation",
    image: "/assets/images/shield-ultra-cool.png",
  },
];

type ServiceItemProps = {
  service: Service;
  isActive: boolean;
  onMouseEnter: () => void;
};

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  isActive,
  onMouseEnter,
}) => (
  <li
    onMouseEnter={onMouseEnter}
    className={`flex justify-between items-center font-[500] text-sm lg:text-md border rounded-2xl px-5 py-2 cursor-pointer ${
      isActive ? "bg-primary text-white" : "border-gray-300 text-gray"
    }`}
  >
    <span>{service.name}</span>
    <span>{service.type}</span>
  </li>
);

const OurServices = () => {
  const [activeService, setActiveService] = useState<Service>(services[0]);

  return (
    <section className="py-8 bg-white">
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
                onMouseEnter={() => setActiveService(service)}
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
