import Image from "next/image";
import React from "react";
interface Props {
  src: string;
  title: string;
  paragraph: string;
}
const IconWithTitle = ({ src, title, paragraph }: Props) => {
  return (
    <div className="flex-col mb-2 gap-0.5">
      <div className="flex items-center  gap-1.5">
        <Image width={24} height={24} alt={title} src={src} />
        <p className="text-primary md:text-md text-sm font-[700] md:font-[600] ">
          {title}
        </p>
      </div>
      <div>
        <p className="text-subtitle md:text-md text-sm font-[500] ">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default IconWithTitle;
