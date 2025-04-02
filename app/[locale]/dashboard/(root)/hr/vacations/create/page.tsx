"use client";
import { useTranslations } from "next-intl";
import { useCreateVacationMutation } from "@/redux/services/dashboard/hr/vacationApi";
import CreatePage from "@/components/dashboard/CreatePage";
import VacationsForm, {
  VacationsFormValues,
} from "@/components/dashboard/forms/hr/VacationsForm";

export default function CreateVacation() {
  const t = useTranslations("hr");
  const [createVacation, { isLoading }] = useCreateVacationMutation();

  const handleSubmit = async (data: VacationsFormValues) => {
    console.log(data);
    const response = await createVacation(data);
    if (response.error) throw new Error("Create failed");
  };

  return (
    <CreatePage
      title={t("vacation.addVacation")}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      Form={VacationsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.vacation")}`}
    />
  );
}
