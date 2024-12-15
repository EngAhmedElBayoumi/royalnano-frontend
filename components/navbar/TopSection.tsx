import Image from "next/image";
import { contactInfo, NavbarSocialLinks } from "./NavbarData";

const TopSection = () => {
  return (
    <div className="top-0 w-full bg-secondary md:h-[44px]  flex justify-between  px-2 items-center py-[5px] ">
      <div className="md:flex sm:block gap-2 sm:py-2 ">
        {contactInfo.map((info) => (
          <div className="flex " key={info.text}>
            <Image alt={info.text} src={info.src} width={24} height={24} />
            <p className="text-white md:text-sm ms-2">{info.text}</p>
          </div>
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
  );
};
export default TopSection;
