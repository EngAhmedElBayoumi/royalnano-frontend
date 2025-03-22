"use client";
import { useTranslations } from "next-intl";
import { useCreateItemMutation } from "@/redux/services/dashboard/inventory/itemsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import ItemForm, { ItemFormValues } from "@/components/dashboard/forms/inventory/ItemForm";

export default function CreateItem() {
  const t = useTranslations("Inventory.InventoryItem");
  const [createItem, { isLoading }] = useCreateItemMutation();

  const handleSubmit = async (data: ItemFormValues) => {
    const payload = {
      ...data,
      category: Number(data.category),
      branch: Number(data.branch),
      supplier: Number(data.supplier),
    };
    const response = await createItem(payload);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("addItem")}
      onSubmit={handleSubmit}
      Form={ItemForm}
      redirectPath="/dashboard/inventory"
      isLoading={isLoading}
    />
  );
}
