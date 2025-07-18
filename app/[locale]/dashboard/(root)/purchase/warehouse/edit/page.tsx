"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetWarehouseByIdQuery,
  useUpdateWarehouseMutation,
} from "@/redux/services/dashboard/purchase/warehouseApi";
import WarehouseForm, {
  WarehouseFormValues,
} from "@/components/dashboard/purchase/WarehouseForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditWarehouse() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("purchase.Warehouse");

  const { data, isLoading, error } = useGetWarehouseByIdQuery(id);
  const [updateWarehouse, { isLoading: submitting }] =
    useUpdateWarehouseMutation();

  const defaultValues: WarehouseFormValues | undefined = data && {
    name: data.name || "",
    location: data.location || "",
    description: data.description || "",
  };

  const handleSubmit = async (formData: WarehouseFormValues) => {
    const response = await updateWarehouse({ id, data: formData });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editWarehouse")}
      data={defaultValues}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={WarehouseForm}
      redirectPath="/dashboard/purchase?tab=warehouse"
    />
  );
}
