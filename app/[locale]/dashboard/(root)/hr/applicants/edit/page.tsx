"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useUpdateApplicantMutation,
  useGetApplicantByIdQuery,
} from "@/redux/services/dashboard/hr/applicantsApi";
import EditPage from "@/components/dashboard/EditPage";
import ApplicantsForm, {
  ApplicantsFormValues,
} from "@/components/dashboard/forms/hr/ApplicantsForm";

export default function EditApplicant() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const { data, isLoading, error } = useGetApplicantByIdQuery(id);
  const [updateApplicant, { isLoading: submitting }] =
    useUpdateApplicantMutation();

  const defaultValues = data && {
    ...data,
    expected_salary: Number(data.expected_salary),
    current_salary: Number(data.current_salary),
  };

  const handleSubmit = async (data: ApplicantsFormValues) => {
    const response = await updateApplicant({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("applicants.editApplicant")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={ApplicantsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.applicants")}`}
    />
  );
}
