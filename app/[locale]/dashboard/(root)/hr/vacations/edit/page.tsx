"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetVacationByIdQuery,
  useUpdateVacationMutation,
} from "@/redux/services/dashboard/hr/vacationApi";
import VacationsForm, {
  VacationsFormValues,
} from "@/components/dashboard/forms/hr/VacationsForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditVacation() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr.vacation");

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
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editVacation")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={VacationsForm}
      redirectPath="/dashboard/hr?tab=vacation"
    />
  );
}
