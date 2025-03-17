"use client";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import useActiveService from "./useActiveService";
import ServiceItem from "./ServiceItem";

const OurServices = () => {
  const t = useTranslations("website.services");
  const { data, isLoading, error } = useGetServicesQuery({});
  const services = React.useMemo(
    () => data?.results.slice(0, 4) || [],
    [data?.results]
  );

  const { activeService, setActiveService, handleMouseEnter } =
    useActiveService(services[0]);

  useEffect(() => {
    if (services.length > 0) {
      setActiveService(services[0]);
    }
  }, [services, setActiveService]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    }
    if ("error" in error) {
      return <div>Error: {error.error}</div>;
    }
    return <div>An error occurred</div>;
  }

  return (
    <section className="pb-8 bg-white relative top-[-100px] animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        {t("title")}
      </h2>
      <div className="flex justify-center">
        <main className="main-container grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[10%] items-center">
          <ul className="space-y-4">
            {services.map(
              (service: {
                name: string;
                id: number;
                alias: string;
                image: string | null;
              }) => (
                <ServiceItem
                  key={service.id}
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
