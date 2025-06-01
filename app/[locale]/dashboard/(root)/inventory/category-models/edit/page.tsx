"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
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

  const [updateCategory, { isLoading: submitting }] =
    useUpdateCategoryMutation();
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(id);

  const handleSubmit = async (data: CategoryFormValues) => {
    const response = await updateCategory({ ...data, id });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editCategory")}
      data={category}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={CategoryForm}
      redirectPath="/dashboard/inventory?tab=category"
    />
  );
}
