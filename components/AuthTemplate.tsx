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
    <div className="flex justify-center items-center w-screen lg:h-screen h-[90%] mt-10 lg:mt-0 bg-gray-100">
      <main className="bg-[#EBECE4]  pb-11 lg:pb-7 mb-4 lg:mb-0 text-black flex flex-col lg:flex-row justify-start items-start  rounded w-[80%]   h-fit rounded-tl-[100px] rounded-br-[100px]">
        {/* left side */}
        <div className="flex justify-start pt-11 items-center flex-col w-[100%]">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={90}
            height={122}
            className="mb-10"
          />
          <div className="flex text-sm xl:text-[20px] lg:text-[40px] font-[400] ">
            <p className="mr-1 text-nowrap">Welcome To</p>
            <span className="text-primary">Royal</span>
          </div>
          <p className=" mb-0 text-sm xl:text-[20px] lg:text-[40px]  font-[400] ">
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
        <div className="bg-[#969696] my-6 w-[1px] h-[600px] hidden lg:flex "></div>
        {/* right side */}
        <div className=" w-[100%]">
          <Form />
        </div>
      </main>
    </div>
  );
};

export default AuthTemplate;
