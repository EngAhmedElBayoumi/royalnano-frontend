"use client";
import Image from "next/image";
import React, { useState } from "react";
import { navLinks } from "@/components/footer/FooterData";
import Link from "next/link";
const Nav = () => {
  const [isClicked, setisClicked] = useState(false);
  const toggleNavbar = () => {
    setisClicked(!isClicked);
  };
  return (
    <nav className=" bg-transparent z-10 flex justify-between items-center pt-8 ps-8 pe-3">
      <Image src="/assets/icons/logo.svg" alt="logo" width={90} height={122} />
      <div className="hidden md:flex  lg:flex-row gap-8">
        {navLinks.map((link) => (
          <Link
            className="hover:text-primary lg:text-md md:text-sm text-black text-nowrap"
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {/* auth */}
      <div className="hidden md:flex  gap-5 items-center ">
        <Link
          className=" lg:text-md md:text-sm text-md hover:text-secondary text-nowrap text-primary"
          href={"/"}
        >
          Log In
        </Link>
        <Link
          className=" lg:text-md md:text-sm text-md hover:text-secondary text-primary"
          href={"/"}
        >
          Register
        </Link>
      </div>
      <div className="md:hidden flex items-center ">
        <button
          className=" inline-flex items-center justify-center rounded-md focus:ring-2 focus:ring-inset focus:ring-black "
          onClick={toggleNavbar}
        >
          {isClicked ? (
            <svg
              className="h-6 w-6 block"
              xmlns="http://ww.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://ww.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      {isClicked && (
        <div className="md:hidden">
          <div className="md:hidden px-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                className="hover:text-primary text-sm block text-black"
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            {/* </div> */}

            <Link
              className="text-sm block hover:text-secondary text-nowrap text-primary"
              href={"/"}
            >
              Log In
            </Link>
            <Link
              className="clock text-sm hover:text-secondary text-primary"
              href={"/"}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
