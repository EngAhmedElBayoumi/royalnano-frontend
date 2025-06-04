"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateItemMutation } from "@/redux/services/dashboard/inventory/itemsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";

export default function CreateItem() {
  const t = useTranslations("Inventory.InventoryItem");
  const [createItem, { isLoading }] = useCreateItemMutation();

  const handleSubmit = async (data: ItemFormValues) => {
    const response = await createItem(data);
    if (response.error) handleApiError(response.error);
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
