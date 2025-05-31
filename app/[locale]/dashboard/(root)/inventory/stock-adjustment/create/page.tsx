"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateStockAdjustmentMutation } from "@/redux/services/dashboard/inventory/stockApi";
import CreatePage from "@/components/dashboard/CreatePage";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";

export default function CreateStockAdjustment() {
  const t = useTranslations("Inventory");
  const [createStockAdjustment, { isLoading }] =
    useCreateStockAdjustmentMutation();

  const handleSubmit = async (data: StockAdjustmentFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
      adjustment_date: new Date(data.adjustment_date)
        .toISOString()
        .slice(0, 10),
    };
    const response = await createStockAdjustment(payload);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("InventoryStockAdjustment.addStockAdjustment")}
      onSubmit={handleSubmit}
      Form={StockAdjustmentForm}
      redirectPath={`/dashboard/inventory?tab=${t("stockAdjustment")}`}
      isLoading={isLoading}
    />
  );
}
