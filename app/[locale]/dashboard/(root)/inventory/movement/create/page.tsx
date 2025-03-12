"use client";
import { useTranslations } from "next-intl";
import { useCreateMovementMutation } from "@/redux/services/dashboard/inventory/movementApi";
import CreatePage from "@/components/dashboard/CreatePage";
import MovementForm, { MovementFormValues } from "@/components/dashboard/forms/inventory/MovementForm";

export default function CreateMovement() {
  const t = useTranslations("Inventory");
  const [createMovement] = useCreateMovementMutation();

  const handleSubmit = async (data: MovementFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
      movement_date: new Date(data.movement_date).toISOString().slice(0, 10),
    };
    const response = await createMovement(payload);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("InventoryMovement.addMovement")}
      onSubmit={handleSubmit}
      Form={MovementForm}
      redirectPath={`/dashboard/inventory?tab=${t("movement")}`}
    />
  );
}
