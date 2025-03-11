"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const [updateEvaluation] = useUpdateEvaluationMutation();
  const { data, isLoading, error } = useGetEvaluationByIdQuery(id);
  const t = useTranslations("hr");

  const defaultValues = data && {
    ...data,
    interview: Number(data.interview.id),
    interviewer: Number(data.interviewer.id),
  };

  const handleSubmit = async (data: EvaluationFormValues) => {
    const response = await updateEvaluation({ id, data });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("editEvaluation")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={EvaluationForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.evaluations")}`}
    />
  );
}
