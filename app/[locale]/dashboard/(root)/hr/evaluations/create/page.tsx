"use client";
import { useTranslations } from "next-intl";
import EvaluationForm, {
  EvaluationFormValues,
} from "@/components/dashboard/forms/hr/EvaluationForm";
import { useCreateEvaluationMutation } from "@/redux/services/dashboard/hr/evaluationApi";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateEvaluation() {
  const t = useTranslations("hr");
  const [createEvaluation] = useCreateEvaluationMutation();

  const handleSubmit = async (data: EvaluationFormValues) => {
    const response = await createEvaluation(data);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("evaluations.addEvaluation")}
      onSubmit={handleSubmit}
      Form={EvaluationForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.evaluations")}`}
    />
  );
}
