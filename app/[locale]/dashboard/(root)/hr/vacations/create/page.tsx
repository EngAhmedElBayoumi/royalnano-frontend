"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateVacationMutation } from "@/redux/services/dashboard/hr/vacationApi";
import CreatePage from "@/components/dashboard/CreatePage";
import VacationsForm, {
  VacationsFormValues,
} from "@/components/dashboard/forms/hr/VacationsForm";

export default function CreateVacation() {
  const t = useTranslations("hr.vacations");
  const [createVacation, { isLoading }] = useCreateVacationMutation();

  const handleSubmit = async (data: VacationsFormValues) => {
    const response = await createVacation(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addVacation")}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      Form={VacationsForm}
      redirectPath="/dashboard/hr?tab=vacation"
    />
  );
}
