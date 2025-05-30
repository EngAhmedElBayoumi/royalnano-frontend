import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { useTranslations } from "next-intl";
import CustomButton from "@/components/formFields/CustomButton";

function EmptyMessage({
  emptyMessage,
  onClick,
}: {
  emptyMessage: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const t = useTranslations();
  return (
    <div className="bg-dashboardBg px-4 pt-4 pb-1 ltr:rounded-tr-[20px] rtl:rounded-tl-[20px] rounded-b-[20px] flex flex-col justify-center items-center w-full card gap-15">
      <Image
        height={400}
        width={400}
        alt="img"
        src="/assets/icons/dashboard/no-data.svg"
        priority={true}
      />
      <p className="text-[30px] text-[#7F7F7F] font-[500]">{emptyMessage}</p>
      <CustomButton
        onClick={onClick}
        text={t("create")}
        className="text-white w-[25%] my-2 capitalize"
      />
    </div>
  );
}

export default EmptyMessage;
