"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useCreateStockAdjustmentMutation } from "@/redux/services/dashboard/stockApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";
import CustomModal from "@/components/modals/CustomModal";

export default function CreateStockAdjustment() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createStockAdjustment] = useCreateStockAdjustmentMutation();
  const t = useTranslations("Inventory");

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: StockAdjustmentFormValues) => {
    try {
      const payload = {
        ...data,
        item: Number(data.item),
        adjustment_date: new Date(data.adjustment_date)
          .toISOString()
          .slice(0, 10),
      };

      const response = await createStockAdjustment(payload);

      if (response.error) throw new Error("creation failed");
      else router.push(`/dashboard/inventory?tab=${t("stockAdjustment")}`);
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
          title={t("InventoryStockAdjustment.addStockAdjustment")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <StockAdjustmentForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
