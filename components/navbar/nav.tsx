"use client";
import Image from "next/image";
import React, { useState } from "react";
import { navLinks } from "@/data/FooterData";
import Link from "next/link";

const Nav = () => {
  const [isClicked, setIsClicked] = useState(false);
  const toggleNavbar = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className="bg-transparent z-10 flex justify-between items-center pt-8 ps-8 pe-3 relative">
      <Image src="/assets/icons/logo.svg" alt="logo" width={90} height={122} />

      {/* desktop menuu */}
      <div className="hidden md:flex gap-8">
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

      {/* Auth Linkss */}
      <div className="hidden md:flex gap-5 items-center ">
        <Link
          className="lg:text-md md:text-sm text-md hover:text-secondary text-nowrap text-primary"
          href={"/"}
        >
          Log In
        </Link>
        <Link
          className="lg:text-md md:text-sm text-md hover:text-secondary text-primary"
          href={"/"}
        >
          Register
        </Link>
      </div>

      {/* Mobile Humburger btnn */}
      <div className="md:hidden flex items-center">
        <button
          className="inline-flex items-center justify-center rounded-md focus:ring-2 focus:ring-inset focus:ring-black"
          onClick={toggleNavbar}
        >
          {isClicked ? (
            <svg
              className="h-6 w-6 block"
              xmlns="http://www.w3.org/2000/svg"
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
              xmlns="http://www.w3.org/2000/svg"
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

      {/* mobile menuuuuu */}
      {isClicked && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white p-6 rounded-lg shadow-lg z-20">
          <button
            className="absolute top-3 right-3 text-black"
            onClick={toggleNavbar}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
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
          </button>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                className="hover:text-primary text-sm block text-black"
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="hover:text-primary text-sm block text-black"
              href={"/"}
            >
              Log In
            </Link>
            <Link
              className="hover:text-primary text-sm block text-black"
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
