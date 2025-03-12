"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetItemByIdQuery,
  useUpdateItemMutation,
} from "@/redux/services/dashboard/inventory/itemsApi";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditItem() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryItem");

  const [updateItem] = useUpdateItemMutation();
  const { data, isLoading, error } = useGetItemByIdQuery(id);

  const defaultValues = data && {
    ...data,
    branch: data.branch.id,
    supplier: data.supplier.id,
    purchase_price: Number(data.purchase_price),
    selling_price: Number(data.selling_price),
  };

  const handleSubmit = async (data: ItemFormValues) => {
    const payload = {
      ...data,
      category: Number(data.category),
      branch: Number(data.branch),
      supplier: Number(data.supplier),
    };
    const response = await updateItem({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("editItem")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={ItemForm}
      redirectPath="/dashboard/inventory"
    />
  );
}
