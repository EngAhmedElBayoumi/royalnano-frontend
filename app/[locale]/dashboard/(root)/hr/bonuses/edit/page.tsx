"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateBonusMutation,
  useGetBonusByIdQuery,
} from "@/redux/services/dashboard/hr/bonusesApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";

export default function EditBonus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useGetBonusByIdQuery(id);
  const [updateBonus] = useUpdateBonusMutation();

  const defaultValues: BonusesFormValues = data && {
    ...data,
    employee: Number(data.employee.id),
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: BonusesFormValues) => {
    try {
      const payload = {
        ...data,
        employee: Number(data.employee),
      };

      const response = await updateBonus({ id, data: payload });

      if (response.error) throw new Error("edit failed");
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
          imageSrc="/assets/icons/edit.svg"
          title="Edit Bonuses"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        {isLoading ? (
          <FormSkelton />
        ) : error ? (
          <LoadingError />
        ) : (
          <BonusesForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        )}
      </div>
    </main>
  );
}
