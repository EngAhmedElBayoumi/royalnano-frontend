"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/data/FooterData";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter, useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useTranslations } from "next-intl";
import { clearProfile } from "@/redux/slices/profileSlice";
import config from "@/lib/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const baseUrl = config.apiUrl;
const Nav = () => {
  const t = useTranslations("website.nav");
  const [isClicked, setIsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useParams()?.locale as string;
  const router = useRouter();
  const accessToken = getCookie("accessToken");
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.profile.name);
  const email_address = useSelector(
    (state: RootState) => state.profile.email_address
  );
  const profile_picture = useSelector(
    (state: RootState) => state.profile.profile_picture
  );
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
      dispatch(clearProfile());
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
                pathname === `/${locale}${link.href}`
                  ? "text-primary"
                  : "text-white"
              } hover:text-primary active:text-primary md:text-sm xl:text-md text-nowrap`}
              key={link.href || "/"}
              href={link.href || "/"}
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
              {t("LogIn")}
            </Link>
            <Link
              className="md:text-sm xl:text-md hover:text-white text-primary"
              href={"/register"}
              passHref
            >
              {t("Register")}
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex">
            <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
              <DropdownMenuTrigger className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      profile_picture
                        ? baseUrl + profile_picture
                        : "/assets/images/user-placeholder.jpg"
                    }
                  />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <h3 className="text-primary">
                  {name ??
                    email_address?.substring(0, email_address.indexOf("@"))}
                </h3>
                <Image
                  src="/assets/icons/angle-down.svg"
                  alt="drop icon"
                  width={15}
                  height={15}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align={locale === "ar" ? "end" : "start"}>
                <DropdownMenuItem className="py-0">
                  <Link
                    href="/profile"
                    passHref
                    className="md:text-[14px] xl:text-sm text-nowrap flex gap-1"
                  >
                    <Image
                      src={`/assets/icons/user.svg`}
                      alt={t("Logout")}
                      width={15}
                      height={15}
                    />
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-0">
                  <button
                    className="md:text-[14px] xl:text-sm text-nowrap flex gap-1"
                    onClick={handleLogout}
                  >
                    <Image
                      src={`/assets/icons/sidebar/logout.svg`}
                      alt={t("Logout")}
                      width={15}
                      height={15}
                    />
                    {t("Logout")}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              {accessToken && (
                <Link
                  className="flex items-center gap-2"
                  href="/profile"
                  passHref
                >
                  <Avatar>
                    <AvatarImage src={baseUrl + profile_picture} />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-primary">
                    {name ??
                      email_address?.substring(0, email_address.indexOf("@"))}
                  </h3>
                </Link>
              )}
              {accessToken && <DropdownMenuSeparator />}
              {navLinks.map((link) => (
                <Link
                  className={`${
                    pathname === `/${locale}${link.href}`
                      ? "text-primary"
                      : "text-black"
                  } hover:text-primary xl:text-sm block`}
                  key={link.href || "/"}
                  href={link.href || "/"}
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
                    {t("LogIn")}
                  </Link>
                  <Link
                    className="hover:text-primary xl:text-sm block text-black"
                    href={"/register"}
                    passHref
                  >
                    {t("Register")}
                  </Link>
                </>
              ) : (
                <button
                  className="hover:text-primary xl:text-sm block text-black text-left"
                  onClick={handleLogout}
                >
                  {t("Logout")}
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
