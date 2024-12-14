import Image from "next/image";
import { contactInfo, NavbarSocialLinks } from "./NavbarData";

const TopSection = () => {
  return (
    <div className="top-0 w-full bg-secondary h-[44px] flex justify-between px-2 items-center py-[5px] ">
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
  );
};
export default TopSection;
