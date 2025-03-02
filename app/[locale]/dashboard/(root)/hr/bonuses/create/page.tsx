"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCreateBonusMutation } from "@/redux/services/dashboard/hr/bonusesApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";

export default function CreateBonus() {
  const router = useRouter();
  const t = useTranslations("hr");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBonus] = useCreateBonusMutation();

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: BonusesFormValues) => {
    try {
      const payload = {
        ...data,
        employee: Number(data.employee),
      };
      const response = await createBonus(payload);
      if (response.error) throw new Error("creation failed");
      else router.push(`/dashboard/hr?tab=${t("tabs.bonuses")}`);
    } catch (error) {
      setIsModalOpen(true);
      console.log(error);
    }
  };

  return (
    <main className="mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your Request wasn't processed successfully.."
      />
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title={t("bonuses.addBonus")}
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
