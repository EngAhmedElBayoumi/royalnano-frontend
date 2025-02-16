"use client";
import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useCreatePreorderMutation } from "@/redux/services/dashboard/preorderApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CreatePreorder() {
  const router = useRouter();

  const [createPreorder] = useCreatePreorderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations("Inventory");

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: PreorderFormValues) => {
    try {
      console.log("submit btn clicked");
      const payload = {
        ...data,
        item: Number(data.item),
      };
      const response = await createPreorder(payload);
      if (response.error) throw new Error("creation failed");
      else router.push(`/dashboard/inventory?tab=${t("preorder")}`);
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
          title={t("InventoryPreorder.addPreorder")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <PreorderForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
