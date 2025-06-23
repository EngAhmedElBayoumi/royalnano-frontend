"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetUnitByIdQuery,
  useUpdateUnitMutation,
} from "@/redux/services/dashboard/inventory/unitsApi";
import UnitForm, {
  UnitFormValues,
} from "@/components/dashboard/forms/inventory/UnitForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditUnit() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryUnit");

  const [updateUnit, { isLoading: submitting }] = useUpdateUnitMutation();
  const { data, isLoading, error } = useGetUnitByIdQuery(id);

  const handleSubmit = async (data: UnitFormValues) => {
    const response = await updateUnit({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editUnit")}
      data={data}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={UnitForm}
      redirectPath="/dashboard/inventory?tab=units"
    />
  );
}
