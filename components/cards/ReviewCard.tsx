import React from "react";
import Image from "next/image";

type ReviewCardProps = {
  name: string;
  rating: number;
  comment: string;
  image: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  rating,
  comment,
  image,
}) => {
  return (
    <section className="h-[370px] xl:h-[410px] flex items-center">
      <div className="flex flex-col items-center pt-6 px-10 rounded-xl xl:rounded-2xl bg-lightGray h-[250px] xl:h-[280px] relative top-5">
        {image ? (
          <Image
            src={image}
            alt={image}
            width={130}
            height={130}
            className="rounded-full border-8 border-white absolute -top-20 h-[130px] object-cover"
          />
        ) : (
          ""
        )}
        <section className="flex flex-col items-center gap-3 relative top-10">
          <h3 className="font-[500] md:text-sm xl:text-md text-primary">
            {name}
          </h3>
          <div className="flex gap-1">
            {Array.from({ length: Math.round(rating) }, (_, i) => (
              <Image
                src="/assets/icons/filled-orange-star.svg"
                alt={name}
                width={18}
                height={18}
                key={i}
              />
            ))}
            {Array.from({ length: 5 - Math.round(rating) }, (_, i) => (
              <Image
                src="/assets/icons/outlined-star.svg"
                alt={name}
                width={18}
                height={18}
                key={i}
              />
            ))}
          </div>
          <p className="text-darkGray text-center">
            {comment?.substring(0, 80)}
          </p>
        </section>
      </div>
    </section>
  );
};

export default ReviewCard;
