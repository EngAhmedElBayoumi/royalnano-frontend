import React from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, socialLinks } from "@/data/FooterData";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-4 lg:py-6 xl:py-8 flex justify-center">
      <section className="main-container w-full px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <article className="mb-4 lg:mb-0 flex gap-3">
            <Image
              src="/assets/images/logo.png"
              alt="Royal Nano Ceramic Logo"
              width={65}
              height={88}
              className="h-[88px]"
            />
            <p className="xl:text-sm">
              Royal Nano Ceramic is a leading car protection company in Egypt,
              offering advanced nano ceramic coatings to protect and enhance.
            </p>
          </article>
          <nav className="mb-4 lg:mb-0">
            <h3 className="md:text-sm xl:text-md">Company</h3>
            <hr className="border-t-5 rounded-10 border-primary mb-2 w-[101px]" />
            <ul className="xl:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} passHref>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <section className="mb-4 lg:mb-0">
            <h3 className="md:text-sm xl:text-md">Branches</h3>
            <hr className="border-t-5 rounded-10 border-primary mb-2 w-[102px]" />
            <ul className="xl:text-sm">
              <li>October</li>
              <li>Nasr City</li>
              <li>Mohandessin</li>
              <li>Sheikh Zayed</li>
              <li>Alexandria</li>
            </ul>
          </section>
          <address>
            <h3 className="md:text-sm xl:text-md">Reach out!</h3>
            <hr className="border-t-5 rounded-10 border-primary mb-2 w-[115px]" />
            <p className="xl:text-sm">
              <a href="tel:+201032222542">+20 103 2222 542</a>
            </p>
            <p className="xl:text-sm">
              <a href="mailto:contact@royalnanoceramic.com">
                contact@royalnanoceramic.com
              </a>
            </p>
          </address>
        </div>
        <hr className="mt-8 border-t-10 rounded-10 border-primary" />
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="xl:text-sm mb-4 md:mb-0 font-semibold">
            Copyright by Royal @2024
          </p>
          <div className="flex space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full"
              >
                <Image
                  src={link.src}
                  alt={link.alt}
                  width={link.width}
                  height={link.height}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
