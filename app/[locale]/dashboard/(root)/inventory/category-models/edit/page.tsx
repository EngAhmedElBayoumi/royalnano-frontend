"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/services/dashboard/inventory/itemCategoryApi";

import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function EditCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [updateCategory] = useUpdateCategoryMutation();
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations("Inventory.InventoryCategory");
  const tabTranslate = useTranslations("Inventory");

  const defaultValues: CategoryFormValues = {
    name: category?.name || "",
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      const payload = {
        ...data,
      };
      const response = await updateCategory({ ...payload, id });

      if (response.error) throw new Error("creation failed");
      else
        router.push(
          `/dashboard/inventory?tab=${tabTranslate("categoryModel")}`
        );
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
          title={t("editCategory")}
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
          <CategoryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        )}
      </div>
    </main>
  );
}
