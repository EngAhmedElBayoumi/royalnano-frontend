"use client";
import React from "react";
// import dynamic from "next/dynamic";
import ContactForm from "../forms/ContactForm";
// import MapComponent from "@/components/map/Map";
// Dynamically Load the Map Component on the Client Side to solve ssr issue accessing window
// const MapComponent = dynamic(() => import("../map/Map"), { ssr: false });

const ContactUs = () => {
  return (
    <section className="py-4 lg:py-6 xl:py-8 bg-white animate-on-scroll">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary">
        Contact Us
      </h2>
      <div className="flex gap-11 justify-center">
        {/* <main className="main-container  items-center "> */}
          <ContactForm />
          {/* <MapComponent /> */}
        {/* </main> */}
      </div>
    </section>
  );
};

export default ContactUs;
