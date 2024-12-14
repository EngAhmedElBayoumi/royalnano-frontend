import Image from "next/image";
import React from "react";
import { navLinks } from "@/components/footer/FooterData";
import Link from "next/link";
const Nav = () => {
  return (
    <nav className="z-10 flex justify-between items-center pt-8 ps-8 pe-3">
      <Image src="/assets/icons/logo.svg" alt="logo" width={90} height={122} />
      <div className="flex flex-col sm:flex-col lg:flex-row gap-8">
        {navLinks.map((link) => (
          <Link className="text-md text-black" key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      {/* auth */}
      <div className="flex gap-5 items-center ">
        <Link className="text-md text-nowrap text-primary" href={"/"}>
          Log In
        </Link>
        <Link className="text-md text-primary" href={"/"}>
          Register
        </Link>
      </div>
      {/* <div>text login</div> */}
    </nav>
  );
};

export default Nav;
