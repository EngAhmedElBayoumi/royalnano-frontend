"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateUnitMutation } from "@/redux/services/dashboard/inventory/unitsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import UnitForm, {
  UnitFormValues,
} from "@/components/dashboard/forms/inventory/UnitForm";

export default function CreateUnit() {
  const t = useTranslations("Inventory");
  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const handleSubmit = async (data: UnitFormValues) => {
    const response = await createUnit(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("InventoryUnit.addUnit")}
      onSubmit={handleSubmit}
      Form={UnitForm}
      redirectPath={`/dashboard/inventory?tab=${t("units")}`}
      isLoading={isLoading}
    />
  );
}
