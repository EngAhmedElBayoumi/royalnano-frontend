import React from "react";
interface PageHeaderProps {
  title: string;
  params?:{locale?: string}
}
const PageHeader: React.FC<PageHeaderProps> = ({ title,params }) => {
  const locale = params?.locale ?? "en"; 
  return (
    <section
      className={` ${locale === "ar" ? "rtl" : "ltr"} relative bg-cover bg-center h-[400px] text-white flex justify-center top-[-160px]`}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, rgba(0, 0, 0, 0.77) 100%), url('/assets/images/hero/multiple-car.png')",
      }}
    >
      <main className="main-container flex flex-col justify-center items-start">
        <h2 className="mt-16 text-md lg:text-lg xl:text-xl capitalize">
          {title}
        </h2>
      </main>
    </section>
  );
};

export default PageHeader;
