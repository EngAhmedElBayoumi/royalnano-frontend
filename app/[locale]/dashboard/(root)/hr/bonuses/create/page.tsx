"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateBonusMutation } from "@/redux/services/dashboard/hr/bonusesApi";
import CreatePage from "@/components/dashboard/CreatePage";
import BonusesForm, {
  BonusesFormValues,
} from "@/components/dashboard/forms/hr/BonusesForm";

export default function CreateBonus() {
  const t = useTranslations("hr");
  const [createBonus, { isLoading }] = useCreateBonusMutation();

  const handleSubmit = async (data: BonusesFormValues) => {
    const payload = {
      ...data,
      employee: Number(data.employee),
    };
    const response = await createBonus(payload);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("bonuses.addBonus")}
      onSubmit={handleSubmit}
      Form={BonusesForm}
      redirectPath="/dashboard/hr?tab=bonuses"
      isLoading={isLoading}
    />
  );
}
