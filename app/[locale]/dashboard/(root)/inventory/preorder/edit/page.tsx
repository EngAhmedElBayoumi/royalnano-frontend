"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetPreorderByIdQuery,
  useUpdatePreorderMutation,
} from "@/redux/services/dashboard/inventory/preorderApi";
import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditPreorder() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryPreorder");
  const tabTranslate = useTranslations("Inventory");
  const { data, isLoading, error } = useGetPreorderByIdQuery(id);
  const [updatePreorder, { isLoading: submitting }] =
    useUpdatePreorderMutation();

  const defaultValues: PreorderFormValues = data && {
    ...data,
    item: String(data.item.id),
  };

  const handleSubmit = async (data: PreorderFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
    };
    const response = await updatePreorder({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editPreorder")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={PreorderForm}
      submitting={submitting}
      redirectPath={`/dashboard/inventory?tab=${tabTranslate("preorder")}`}
    />
  );
}
