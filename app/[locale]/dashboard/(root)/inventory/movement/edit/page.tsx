"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import {
  useGetMovementByIdQuery,
  useUpdateMovementMutation,
} from "@/redux/services/dashboard/inventory/movementApi";
import EditPage from "@/components/dashboard/EditPage";

export default function EditMovement() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [updateMovement, { isLoading: submitting }] =
    useUpdateMovementMutation();
  const { data, isLoading, error } = useGetMovementByIdQuery(id);
  const t = useTranslations("inventory");

  const defaultValues: MovementFormValues = data && {
    ...data,
    item: String(data.item.id),
  };

  const handleSubmit = async (data: MovementFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
      movement_date: new Date(data.movement_date).toISOString().slice(0, 10),
    };
    const response = await updateMovement({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("movement.editMovement")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={MovementForm}
      redirectPath={`/dashboard/inventory?tab=${t("movement")}`}
    />
  );
}
