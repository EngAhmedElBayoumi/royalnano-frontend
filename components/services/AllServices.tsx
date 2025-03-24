"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import ServiceCard from "@/components/cards/ServiceCard";
import { Paginator } from "primereact/paginator";
import LoadingError from "@/components/dashboard/LoadingError";
import ServicesSkeleton from "./ServicesSkeleton";

interface Service {
  name: string;
  id: number;
  alias: string;
  image: string;
}

const AllServices = () => {
  const t = useTranslations("website.services");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetServicesQuery({
    page,
    page_size: 8,
  });

  const services = data?.results || [];
  const totalRecords = data?.count || 0;

  return (
    <section className="pb-8 bg-white relative top-[-100px] animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        {t("title")}
      </h2>
      <div className="flex justify-center flex-col items-center">
        {error ? (
          <LoadingError />
        ) : isLoading ? (
          <ServicesSkeleton />
        ) : (
          <main className="main-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service: Service) => (
              <ServiceCard
                key={service.id}
                title={service.name}
                alias={service.alias}
                imageSrc={service.image}
                book={true}
              />
            ))}
          </main>
        )}
      </div>
      {totalRecords > 8 && (
        <div className="mt-6 flex justify-center">
          <Paginator
            first={(page - 1) * 8}
            rows={8}
            totalRecords={totalRecords}
            onPageChange={(e) => setPage(e.page + 1)}
          />
        </div>
      )}
    </section>
  );
};

export default AllServices;
