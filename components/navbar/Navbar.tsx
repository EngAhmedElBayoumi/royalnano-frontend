import Image from "next/image";
import React from "react";
import { contactInfo, NavbarSocialLinks } from "./NavbarData";
import { navLinks } from "@/components/footer/FooterData";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      {/* top section */}
      <div className="w-full bg-secondary h-[44px] flex justify-between px-2 items-center py-[5px] ">
        <div className="flex gap-2">
          {contactInfo.map((info) => (
            <>
              <Image
                key={info.text}
                alt={info.text}
                src={info.src}
                width={24}
                height={24}
              />
              <p className="text-white text-sm">{info.text}</p>
            </>
          ))}
        </div>
        <div className=" flex justify-between gap-7">
          {NavbarSocialLinks.map((link) => (
            <Image
              key={link.href}
              alt={link.alt}
              src={link.src}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
      {/* //links section */}
      <div className="z-10 flex justify-between items-center pt-8 ps-8 pe-3">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={90}
          height={122}
        />
        <div className="flex flex-col sm:flex-col lg:flex-row gap-8">
          {navLinks.map((link) => (
            <Link
              className="text-md text-black"
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* third section for auth */}
        <div className="flex gap-5 items-center ">
          <Link className="text-md text-nowrap text-primary" href={"/"}>
            Log In
          </Link>
          <Link className="text-md text-primary" href={"/"}>
            Register
          </Link>
        </div>
        {/* <div>text login</div> */}
      </div>
    </div>
  );
};

export default Navbar;
