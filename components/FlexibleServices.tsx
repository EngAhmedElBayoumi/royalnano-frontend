"use client";
import React from "react";
import { useTranslations } from 'next-intl';

const FlexibleServices = () => {
  const t = useTranslations('website.flexibleServices'); // Access translations

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
        <h2 className="mb-2">{t('title')}</h2> {/* Translated title */}
        <p className="md:w-[40%]">
          {t('description')} {/* Translated description */}
        </p>
        <button
          className="mt-4 px-6 xl:px-8 border border-primary text-primary md:text-sm xl:text-md 
        rounded-xl xl:rounded-2xl hover:bg-primary hover:text-white transition xl:h-[60px]"
        >
          {t('buttonText')} {/* Translated button text */}
        </button>
      </header>
    </article>
  );
};

export default FlexibleServices;