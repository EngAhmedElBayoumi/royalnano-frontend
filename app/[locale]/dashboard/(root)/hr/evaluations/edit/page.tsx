"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import EvaluationForm, {
  EvaluationFormValues,
} from "@/components/dashboard/forms/hr/EvaluationForm";
import {
  useGetEvaluationByIdQuery,
  useUpdateEvaluationMutation,
} from "@/redux/services/dashboard/hr/evaluationApi";
import EditPage from "@/components/dashboard/EditPage";

export default function EditEvaluation() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr.evaluations");

  const [updateEvaluation, { isLoading: submitting }] =
    useUpdateEvaluationMutation();
  const { data, isLoading, error } = useGetEvaluationByIdQuery(id);

  const defaultValues = data && {
    ...data,
    interview: Number(data.interview.id),
    interviewer: Number(data.interviewer.id),
  };

  const handleSubmit = async (data: EvaluationFormValues) => {
    const response = await updateEvaluation({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editEvaluation")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={EvaluationForm}
      redirectPath="/dashboard/hr?tab=evaluations"
    />
  );
}
