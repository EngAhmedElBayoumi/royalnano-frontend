import ContactUs from "@/components/contactUs/ContactUs";
import Hero from "@/components/Hero";

import React from "react";

const Page = () => {
  return (
    <>
      <Hero />
      <div className="relative top-[-100px]">
        <ContactUs />
      </div>
    </>
  );
};

export default Page;
