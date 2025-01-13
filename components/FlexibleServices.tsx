import React from "react";

const FlexibleServices = () => {
  return (
    <article
      className="relative bg-cover bg-center h-[50vh] xl:h-[542px] text-white flex justify-center top-[-40px]"
      style={{ backgroundImage: "url('/assets/images/flex-service-bg.png')" }}
    >
      <div className="absolute inset-0 bg-secondary opacity-60"></div>
      <header
        className="relative flex flex-col justify-center text-center 
      md:text-start items-center md:items-start h-full main-container text-md lg:text-lg xl:text-xl"
      >
        <h2 className="mb-2">Flexible Services</h2>
        <p className="md:w-[40%]">
          Smart solutions for all your charter requirements
        </p>
        <button
          className="mt-4 px-6 xl:px-8 border border-primary text-primary md:text-sm xl:text-md 
        rounded-xl xl:rounded-2xl hover:bg-primary hover:text-white transition xl:h-[60px]"
        >
          All Solution
        </button>
      </header>
    </article>
  );
};

export default FlexibleServices;
