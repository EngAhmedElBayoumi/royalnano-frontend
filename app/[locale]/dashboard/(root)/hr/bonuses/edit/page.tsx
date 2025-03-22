"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateBonusMutation,
  useGetBonusByIdQuery,
} from "@/redux/services/dashboard/hr/bonusesApi";
import EditPage from "@/components/dashboard/EditPage";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";

export default function EditBonus() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const { data, isLoading, error } = useGetBonusByIdQuery(id);
  const [updateBonus, { isLoading: submitting }] = useUpdateBonusMutation();

  const defaultValues: BonusesFormValues = data && {
    ...data,
    employee: Number(data.employee.id),
    amount: Number(data.amount),
  };

  const handleSubmit = async (data: BonusesFormValues) => {
    const payload = {
      ...data,
      employee: Number(data.employee),
    };
    const response = await updateBonus({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("bonuses.editBonus")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={BonusesForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.bonuses")}`}
    />
  );
}
