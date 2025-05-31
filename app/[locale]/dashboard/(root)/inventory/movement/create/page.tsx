"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateMovementMutation } from "@/redux/services/dashboard/inventory/movementApi";
import CreatePage from "@/components/dashboard/CreatePage";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";

export default function CreateMovement() {
  const t = useTranslations("Inventory");
  const [createMovement, { isLoading }] = useCreateMovementMutation();

  const handleSubmit = async (data: MovementFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
      movement_date: new Date(data.movement_date).toISOString().slice(0, 10),
    };
    const response = await createMovement(payload);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("InventoryMovement.addMovement")}
      onSubmit={handleSubmit}
      Form={MovementForm}
      redirectPath={`/dashboard/inventory?tab=${t("movement")}`}
      isLoading={isLoading}
    />
  );
}
