import Image from "next/image";
import React, { MouseEventHandler } from "react";
import CustomButton from "../formFields/CustomButton";

function EmptyMessage({
  emptyMessage,
  onClick,
}: {
  emptyMessage: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="bg-dashboardBg pt-20 px-4 pt-4 pb-1 ltr:rounded-tr-[20px] rtl:rounded-tl-[20px] rounded-b-[20px] flex flex-col justify-center items-center w-full card gap-15">
      <Image
        height={100}
        width={400}
        alt="img"
        src="/assets/icons/noCustomers.svg"
      />
      <p className="text-[30px] text-[#7F7F7F] font-[500]">{emptyMessage}</p>
      <CustomButton
        onClick={onClick}
        text="Create"
        className="text-white w-[25%] my-2"
      />
    </div>
  );
}

export default EmptyMessage;
