import About from "@/components/about/About";
import Hero from "@/components/Hero";
import OurSolutions from "@/components/ourSolutions/OurSolutions";
import CustomerReviews from "@/components/reviews/CustomerReviews";
import React from "react";

const Page = () => {
  return (
    <>
      <Hero />
      <About showTitle={false} />
      <OurSolutions />
      <CustomerReviews />
    </>
  );
};

export default Page;
