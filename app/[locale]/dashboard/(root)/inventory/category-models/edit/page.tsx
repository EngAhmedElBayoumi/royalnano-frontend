"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/services/dashboard/inventory/itemCategoryApi";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditCategory() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryCategory");
  const tabTranslate = useTranslations("Inventory");

  const [updateCategory] = useUpdateCategoryMutation();
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(id);

  const handleSubmit = async (data: CategoryFormValues) => {
    const response = await updateCategory({ ...data, id });
    if (response.error) throw new Error("update failed");
  };

  return (
    <EditPage
      title={t("editCategory")}
      data={category}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={CategoryForm}
      redirectPath={`/dashboard/inventory?tab=${tabTranslate("categoryModel")}`}
    />
  );
}
