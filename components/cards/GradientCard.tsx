import React from "react";
interface Props {
  title: string;
  paragraph: string;
}
const GradientCard = ({ title, paragraph }: Props) => {
  return (
    <div className=" text-center rounded-2xl bg-gradient-to-b from-primary to-gray w-[100%] h-[100%] pt-[7px] px-3">
      <p className="text-md leading-[46px]  text-neutralGray">{title}</p>
      <p className="md:text-[20px] text-[15px] text-neutralGray leading-9 font-[700]">
        {paragraph}
      </p>
    </div>
  );
};

export default GradientCard;
