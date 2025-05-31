"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import EvaluationForm, {
  EvaluationFormValues,
} from "@/components/dashboard/forms/hr/EvaluationForm";
import { useCreateEvaluationMutation } from "@/redux/services/dashboard/hr/evaluationApi";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateEvaluation() {
  const t = useTranslations("hr");
  const [createEvaluation, { isLoading }] = useCreateEvaluationMutation();

  const handleSubmit = async (data: EvaluationFormValues) => {
    const response = await createEvaluation(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("evaluations.addEvaluation")}
      onSubmit={handleSubmit}
      Form={EvaluationForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.evaluations")}`}
      isLoading={isLoading}
    />
  );
}
