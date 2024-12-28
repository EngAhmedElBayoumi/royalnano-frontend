import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  warranty: string;
  country: string;
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  warranty,
  country,
  imageSrc,
}) => {
  return (
    <div className="border border-primary rounded-10 overflow-hidden">
      <Image
        src={imageSrc}
        alt={title}
        width={270}
        height={200}
        className="w-full"
      />
      <article className="bg-lightGray p-2 text-darkGray text-sm h-full pb-4">
        <h3 className="font-semibold text-primary text-[20px]">{title}</h3>
        <p>
          Warranty: <span className="text-subtitle">{warranty}</span>
        </p>
        <p>
          Country of manufacture:{" "}
          <span className="text-subtitle">{country}</span>
        </p>
      </article>
    </div>
  );
};

export default ServiceCard;
