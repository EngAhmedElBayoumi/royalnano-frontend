import React from "react";
import Image from "next/image";
const AuthTemplate = ({
  src,
  Form,
}: {
  src: string;
  Form: React.ComponentType;
}) => {
  return (
    <section className="flex justify-center items-center py-[3vh] bg-gray-100">
      <main className="py-2 bg-neutralGray lg:h-[94vh] flex flex-col lg:flex-row min-w-[280px] w-[90%] sm:w-[80%] rounded-tl-[100px] rounded-br-[100px]">
        {/* left side */}
        <div className="flex flex-col justify-center items-center w-[100%] h-[100%]">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={90}
            height={122}
            className="mb-10"
          />
          <div className="flex text-sm lg:text-[20px] xl:text-xl font-[400] gap-1">
            <p className="text-nowrap">Welcome To</p>
            <span className="text-primary">Royal</span>
          </div>
          <p className="mb-10 text-sm lg:text-[20px] xl:text-xl font-[400]">
            Nano Ceramic
          </p>
          <Image
            className="hidden lg:flex"
            src={src}
            alt={src}
            width={350}
            height={150}
          />
        </div>
        {/* separator */}
        <div className="bg-gray mt-[2%] w-[1px] h-[94%] hidden lg:flex"></div>
        {/* right side */}
        <div className="flex flex-col justify-center w-[100%] h-[100%]">
          <Form />
        </div>
      </main>
    </section>
  );
};

export default AuthTemplate;
