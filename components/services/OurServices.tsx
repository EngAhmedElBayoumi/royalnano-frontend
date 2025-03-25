"use client";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import useActiveService from "./useActiveService";
import ServiceItem from "./ServiceItem";
import LoadingError from "@/components/dashboard/LoadingError";
import OurServicesSkeleton from "./OurServicesSkeleton";

interface Service {
  name: string;
  id: number;
  alias: string;
  image: string | null;
}

const OurServices = () => {
  const t = useTranslations("website.services");
  const { data, isLoading, error } = useGetServicesQuery({ page: 1 });
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

  return (
    <section className="pb-8 bg-white relative top-[-100px] animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        {t("title")}
      </h2>
      <div className="flex justify-center">
        {error ? (
          <LoadingError />
        ) : isLoading ? (
          <OurServicesSkeleton />
        ) : (
          <main className="main-container grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[10%] items-center">
            <ul className="space-y-4">
              {services.map((service: Service) => (
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
              ))}
            </ul>
            {activeService?.image ? (
              // eslint-disable-next-line
              <img
                src={activeService.image}
                alt={activeService.name}
                className="rounded-lg h-[350px] xl:h-[400px] w-full object-cover"
              />
            ) : null}
          </main>
        )}
      </div>
    </section>
  );
};

export default OurServices;
