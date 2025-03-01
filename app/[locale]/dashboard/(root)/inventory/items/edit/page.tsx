"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetItemByIdQuery,
  useUpdateItemMutation,
} from "@/redux/services/dashboard/itemsApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";

export default function EditItem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, error } = useGetItemByIdQuery(id);
  const [updateItem] = useUpdateItemMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Inventory.InventoryItem");

  const defaultValues: ItemFormValues = data && {
    ...data,
    purchase_price: Number(data.purchase_price),
    selling_price: Number(data.selling_price),
  };

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

      const response = await updateItem({ id, data: payload });

      if (response.error) throw new Error("edit failed");
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
          imageSrc="/assets/icons/edit.svg"
          title={t("editItem")}
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
          <ItemForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        )}
      </div>
    </main>
  );
}
