"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetItemByIdQuery,
  useUpdateItemMutation,
} from "@/redux/services/dashboard/inventory/itemsApi";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";
import EditPage from "@/components/dashboard/EditPage";
import { extractChangedFields } from "@/lib/utils/extractChangedFields";

export default function EditItem() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryItem");

  const { data, isLoading, error } = useGetItemByIdQuery(id);
  const [updateItem, { isLoading: submitting }] = useUpdateItemMutation();

  const defaultValues = data && {
    ...data,
    branch: data.branch.id,
    supplier: data.supplier.id,
    category: data.category.id,
    purchase_price: Number(data.purchase_price),
    selling_price: Number(data.selling_price),
  };

  const handleSubmit = async (data: ItemFormValues) => {
    const changedData = extractChangedFields(data, defaultValues);

    const response = await updateItem({ id, data: changedData });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editItem")}
      data={defaultValues}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={ItemForm}
      redirectPath="/dashboard/inventory"
    />
  );
}
