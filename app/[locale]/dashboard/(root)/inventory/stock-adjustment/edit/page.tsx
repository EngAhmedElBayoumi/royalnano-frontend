"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";
import {
  useGetStockAdjustmentByIdQuery,
  useUpdateStockAdjustmentMutation,
} from "@/redux/services/dashboard/inventory/stockApi";
import EditPage from "@/components/dashboard/EditPage";

export default function EditStockAdjustment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [updateStockAdjustment, { isLoading: submitting }] =
    useUpdateStockAdjustmentMutation();
  const { data, isLoading, error } = useGetStockAdjustmentByIdQuery(id);
  const t = useTranslations("inventory");

  const defaultValues: StockAdjustmentFormValues = data && {
    ...data,
    item: String(data.item.id),
  };

  const handleSubmit = async (data: StockAdjustmentFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
      adjustment_date: new Date(data.adjustment_date)
        .toISOString()
        .slice(0, 10),
    };
    const response = await updateStockAdjustment({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("stockAdjustment.editStockAdjustment")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={StockAdjustmentForm}
      redirectPath={`/dashboard/inventory?tab=${t("stockAdjustment")}`}
    />
  );
}
