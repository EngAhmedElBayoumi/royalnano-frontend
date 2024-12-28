import React from "react";
import GradientCard from "../cards/GradientCard";
import { OurSolutionsData } from "@/data/OurSolutionsData";
const OurSolutions = () => {
  return (
    <section className="py-8 bg-white">
      <h2 className="text-center text-lg font-bold text-primary">
        Our Solutions
      </h2>
      <div className="flex justify-center ">
        <main className="main-container grid grid-cols-1  ">
          <p className="md:text-[30px] md:text-start text-center text-[20px] mb-3 leading-[56.22px] text-gray font-[600]">
            Royal Nano Ceramic offers advanced protection services for vehicles,
            aircraft, boats, and motorcycles in Egypt. Using the best
            international materials and modern nano-ceramic technologies, the
            company ensures top-level protection and quality, delivering a
            unique experience that makes them the leading choice in the market
          </p>
          <div className="flex items-center md:items-start flex-col lg:flex-row gap-7">
            {OurSolutionsData.map((item) => (
              <GradientCard
                paragraph={item.paragraph}
                key={item.title}
                title={item.title}
              />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default OurSolutions;
