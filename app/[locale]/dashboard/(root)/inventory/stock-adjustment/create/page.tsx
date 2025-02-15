"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateStockAdjustmentMutation } from "@/redux/services/dashboard/stockApi";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";

export default function CreateStockAdjustment() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createStockAdjustment] = useCreateStockAdjustmentMutation();

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
      router.push("/dashboard/inventory");
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
          title="Add Stock Adjustment"
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
