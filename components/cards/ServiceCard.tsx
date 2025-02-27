import React from "react";
import Image from "next/image";
import CustomButton from "@/components/formFields/CustomButton";
import {Link} from '@/i18n/routing';

interface ServiceCardProps {
  title: string;
  warranty: string;
  country: string;
  imageSrc: string;
  book?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  warranty,
  country,
  imageSrc,
  book,
}) => {
  return (
    <div className="border border-primary rounded-10 overflow-hidden max-w-[274px]">
      <Image
        src={imageSrc}
        alt={title}
        width={270}
        height={200}
        className="w-full"
      />
      <article className="bg-lightGray p-2 text-darkGray h-full pb-4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-primary text-sm xl:text-[20px]">
            {title}
          </h3>
          {book && (
            <Link href="/book-now" passHref>
              <CustomButton
                text="book now"
                variant="outline"
                className="capitalize h-[35px] border-primary !text-primary"
              />
            </Link>
          )}
        </div>
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
