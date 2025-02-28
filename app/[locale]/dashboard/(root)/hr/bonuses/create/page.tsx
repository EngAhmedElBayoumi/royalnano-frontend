"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCreateBonusMutation } from "@/redux/services/dashboard/hr/bonusesApi";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";

export default function CreateBonus() {
  // const [createBonus] = useCreateBonusMutation();

  const handleSubmit = async (data: BonusesFormValues) => {
    console.log(data);
    // await createBonus(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Bonuses"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <BonusesForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
