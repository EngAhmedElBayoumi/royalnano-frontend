"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCreateItemMutation } from "@/redux/services/dashboard/itemsApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";

export default function CreateItem() {
  const router = useRouter();
  const t = useTranslations("Inventory.InventoryItem");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createItem] = useCreateItemMutation();

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: ItemFormValues) => {
    try {
      const payload = {
        ...data,
        category: Number(data.category),
        branch: Number(data.branch),
        supplier: Number(data.supplier),
      };

      const response = await createItem(payload);
      if (response.error) throw new Error("creation failed");
      else router.push("/dashboard/inventory");
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
          title={t("addItem")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <ItemForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
