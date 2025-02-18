"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  useGetPreorderByIdQuery,
  useUpdatePreorderMutation,
} from "@/redux/services/dashboard/preorderApi";

import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";

export default function EditPreorder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const t = useTranslations("Inventory.InventoryPreorder");
  const tabTranslate = useTranslations("Inventory");

  const [updatePreorder] = useUpdatePreorderMutation();
  const { data, isLoading, error } = useGetPreorderByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues: PreorderFormValues = data && {
    ...data,
    item: String(data.item.id),
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: PreorderFormValues) => {
    try {
      const payload = {
        ...data,
        item: Number(data.item),
      };
      const response = await updatePreorder({ id, data: payload });

      if (response.error) throw new Error("creation failed");
      else router.push(`/dashboard/inventory?tab=${tabTranslate("preorder")}`);
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
          title={t("editPreorder")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : error ? (
          <div className="flex justify-center flex-col items-center">
            <Image
              src="/assets/icons/dashboard/loading-error.svg"
              alt="loading error"
              width="400"
              height="300"
            />
            Error loading data
          </div>
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <PreorderForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          </div>
        )}
      </div>
    </main>
  );
}
