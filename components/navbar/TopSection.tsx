import Image from "next/image";
import { contactInfo, NavbarSocialLinks } from "@/data/NavbarData";
import Link from "next/link";

const TopSection = () => {
  return (
    <div className="top-0 w-full bg-secondary hidden md:flex md:h-[44px]   justify-between  px-2 items-center py-[5px] ">
      <div className="md:flex sm:block gap-2 sm:py-2 ">
        {contactInfo.map((info) => (
          <div className="flex" key={info.text}>
            <a
              href={
                info.text.includes("@")
                  ? `mailto:${info.text}`
                  : `tel:${info.text.replace(/\s+/g, "")}`
              }
              className="flex items-center"
            >
              <Image alt={info.text} src={info.src} width={24} height={24} />
              <p className="text-white md:text-sm ms-2">{info.text}</p>
            </a>
          </div>
        ))}
      </div>
      <div className=" flex justify-center md:gap-7 gap-1 items-center md:flex-row flex-col">
        {NavbarSocialLinks.map((link, i) => {
          if (i === 3) {
            return (
              <div key="hello" className="gap-1 md:py-2 py-2 flex items-center">
                <p className="text-white text-[15px] md:flex hidden">EN</p>
                <Image
                  key={link.href}
                  alt={link.alt}
                  src={link.src}
                  width={24}
                  height={24}
                />
              </div>
            );
          } else
            return (
              <Link key={link.href} href={link.href}>
                <Image
                  alt={link.alt}
                  src={link.src}
                  width={24}
                  height={24}
                  className="py-2 md:py-2 "
                />
              </Link>
            );
        })}
      </div>
    </div>
  );
};
export default TopSection;
