"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateCategoryMutation } from "@/redux/services/dashboard/inventory/itemCategoryApi";
import CreatePage from "@/components/dashboard/CreatePage";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";

export default function CreateCategory() {
  const t = useTranslations("Inventory.InventoryCategory");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (data: CategoryFormValues) => {
    const response = await createCategory(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addCategory")}
      onSubmit={handleSubmit}
      Form={CategoryForm}
      redirectPath="/dashboard/inventory?tab=category"
      isLoading={isLoading}
    />
  );
}
