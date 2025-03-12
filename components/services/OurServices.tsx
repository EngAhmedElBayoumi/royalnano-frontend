"use client";
import React from "react";
import ServiceItem from "./ServiceItem";
import useActiveService from "./useActiveService";
// import useGetServicesQuery from "./useGetServicesQuery"; // Import the custom hook
import { useTranslations } from "next-intl";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";

const OurServices = () => {
  const t = useTranslations("website.services");
  const { data, loading, error } = useGetServicesQuery({});
  const services = data?.results || [];

  const { activeService, handleMouseEnter } = useActiveService(services[0]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="pb-8 bg-white relative top-[-100px] animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        {t("title")} {/* Translated title */}
      </h2>
      <div className="flex justify-center">
        <main className="main-container grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[10%] items-center">
          <ul className="space-y-4">
            {services.map(
              (
                service: {
                  key?: any;
                  name: any;
                  id?: number;
                  alias?: string;
                  description?: string;
                  image?: string | null;
                  created_at?: string;
                  type?: string | undefined;
                },
                index: React.Key | null | undefined
              ) => (
                <ServiceItem
                  key={index}
                  service={{
                    ...service,
                    name: service.name,
                    alias: service.alias,
                  }}
                  isActive={activeService?.name === service.name}
                  onMouseEnter={() => handleMouseEnter(service)}
                />
              )
            )}
          </ul>
          {/* eslint-disable */}
          {activeService?.image ? (
            <img
              src={activeService?.image}
              alt={activeService?.name}
              className="rounded-lg h-[350px] xl:h-[400px] w-full object-cover"
            />
          ) : (
            ""
          )}
        </main>
      </div>
    </section>
  );
};

export default OurServices;
