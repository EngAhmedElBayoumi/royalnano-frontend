"use client";
import { useState } from "react";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/services/dashboard/itemCategoryApi";
import { useRouter, useSearchParams } from "next/navigation";
import CustomModal from "@/components/modals/CustomModal";
import { useTranslations } from "next-intl";

export default function EditCategory() {
  const router = useRouter();
  const [updateCategory] = useUpdateCategoryMutation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: category, isLoading, error } = useGetCategoryByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Edit.Inventory");

  const defaultValues: CategoryFormValues = {
    name: category?.name || "",
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      console.log("submit btn clicked");
      const payload = {
        ...data,
      };
      console.log(data);
      const response = await updateCategory({ ...payload, id });
      console.log("req sent");
      console.log(response);
      router.push("/dashboard/inventory");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading category data</div>;

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
          title={t("categoryModel")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <CategoryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
