"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetVacationByIdQuery,
  useUpdateVacationMutation,
} from "@/redux/services/dashboard/hr/vacationApi";
import EditPage from "@/components/dashboard/EditPage";
import VacationsForm, {
  VacationsFormValues,
} from "@/components/dashboard/forms/hr/VacationsForm";

export default function EditVacation() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const { data, isLoading, error } = useGetVacationByIdQuery(id);
  const [updateVacation, { isLoading: submitting }] =
    useUpdateVacationMutation();

  const defaultValues: VacationsFormValues = data && {
    ...data,
    employee: String(data.employee.id),
  };

  const handleSubmit = async (data: VacationsFormValues) => {
    const payload = {
      ...data,
      status: data.status,
    };
    const response = await updateVacation({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("vacation.editVacation")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={VacationsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.vacation")}`}
    />
  );
}
