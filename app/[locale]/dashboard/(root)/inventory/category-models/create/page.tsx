"use client";
import { useTranslations } from "next-intl";
import { useCreateCategoryMutation } from "@/redux/services/dashboard/inventory/itemCategoryApi";
import CreatePage from "@/components/dashboard/CreatePage";
import CategoryForm, { CategoryFormValues } from "@/components/dashboard/forms/inventory/CategoryForm";

export default function CreateCategory() {
  const t = useTranslations("Inventory");
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (data: CategoryFormValues) => {
    const response = await createCategory(data);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("InventoryCategory.addCategory")}
      onSubmit={handleSubmit}
      Form={CategoryForm}
      redirectPath={`/dashboard/inventory?tab=${t("categoryModel")}`}
    />
  );
}
