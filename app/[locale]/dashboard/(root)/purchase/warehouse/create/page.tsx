"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateWarehouseMutation } from "@/redux/services/dashboard/purchase/warehouseApi";
import WarehouseForm, {
  WarehouseFormValues,
} from "@/components/dashboard/purchase/WarehouseForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateWarehouse() {
  const t = useTranslations("Purchase.Warehouse");
  const [createWarehouse, { isLoading: submitting, error }] = useCreateWarehouseMutation();

  const handleSubmit = async (formData: WarehouseFormValues) => {
    const response = await createWarehouse(formData);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addWarehouse")}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={WarehouseForm}
      redirectPath="/dashboard/purchase?tab=warehouse"
    />
  );
}

