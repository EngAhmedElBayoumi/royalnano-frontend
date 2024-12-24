import React from "react";

const FlexibleServices = () => {
  return (
    <article
      className="relative bg-cover bg-center h-[542px] text-white flex justify-center top-[-40px]"
      style={{ backgroundImage: "url('/assets/images/flex-service-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <header
        className="relative z-10 flex flex-col justify-center text-center 
      md:text-start items-center md:items-start h-full main-container text-md md:text-lg"
      >
        <h2 className="mb-2">Flexible Services</h2>
        <p className="max-w-[610px]">
          Smart solutions for all your charter requirements
        </p>
        <button
          className="mt-4 px-8 border border-primary text-primary text-md 
        rounded-2xl hover:bg-primary hover:text-white transition h-[60px]"
        >
          All Solution
        </button>
      </header>
    </article>
  );
};

export default FlexibleServices;
