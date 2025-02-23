"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/data/FooterData";
import { Link } from '@/i18n/routing';
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useTranslations } from 'next-intl';

const Nav = () => {
  const t = useTranslations('website.nav'); 
  const [isClicked, setIsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = getCookie("accessToken");
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logout());
      deleteCookie("accessToken");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`${
        isScrolled ? "bg-secondary bg-opacity-90" : "md:bg-transparent"
      } z-20 sticky top-0 transition-colors duration-300 flex justify-center`}
    >
      <main className="main-container flex justify-between py-2 items-center">
        <Image src="/assets/icons/logo.svg" alt="logo" width={50} height={80} />

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              className={`${
                pathname === link.href
                  ? "text-primary" 
                  : "text-white"
              } hover:text-primary active:text-primary md:text-sm xl:text-md text-nowrap`}
              key={link.href}
              href={link.href}
              passHref
            >
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        {!accessToken ? (
          <div className="hidden md:flex gap-5 items-center">
            <Link
              className="md:text-sm xl:text-md hover:text-white text-nowrap text-primary"
              href={"/login"}
              passHref
            >
              {t('LogIn')} 
            </Link>
            <Link
              className="md:text-sm xl:text-md hover:text-white text-primary"
              href={"/register"}
              passHref
            >
              {t('Register')} 
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-5 items-center">
            <button
              className="md:text-sm xl:text-md hover:text-white text-nowrap text-primary"
              onClick={handleLogout}
            >
              {t('Logout')} {/* Use translations */}
            </button>
          </div>
        )}

        {/* Mobile Hamburger Button */}
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
                stroke="white"
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

        {/* Mobile Menu */}
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
                  className="hover:text-primary xl:text-sm block text-black"
                  key={link.href}
                  href={link.href}
                  passHref
                >
                  {t(link.label)} {/* Use translations */}
                </Link>
              ))}
              {!accessToken ? (
                <>
                  <Link
                    className="hover:text-primary xl:text-sm block text-black"
                    href={"/login"}
                    passHref
                  >
                    {t('LogIn')}
                  </Link>
                  <Link
                    className="hover:text-primary xl:text-sm block text-black"
                    href={"/register"}
                    passHref
                  >
                    {t('Register')}
                  </Link>
                </>
              ) : (
                <button
                  className="hover:text-primary xl:text-sm block text-black text-left"
                  onClick={handleLogout}
                >
                  {t('Logout')} 
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </nav>
  );
};

export default Nav;