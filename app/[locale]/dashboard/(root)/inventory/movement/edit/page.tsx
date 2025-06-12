"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetMovementByIdQuery,
  useUpdateMovementMutation,
} from "@/redux/services/dashboard/inventory/movementApi";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditMovement() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryMovement");

  const [updateMovement, { isLoading: submitting }] =
    useUpdateMovementMutation();
  const { data, isLoading, error } = useGetMovementByIdQuery(id);

  const defaultValues: MovementFormValues = data && {
    ...data,
    item: data.item.id,
    from_branch: data.from_branch.id,
    to_branch: data.to_branch.id,
  };

  const handleSubmit = async (data: MovementFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
      movement_date: new Date(data.movement_date).toISOString().slice(0, 10),
    };
    const response = await updateMovement({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editMovement")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={MovementForm}
      redirectPath="/dashboard/inventory?tab=movement"
    />
  );
}
