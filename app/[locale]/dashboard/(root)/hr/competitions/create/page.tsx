"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import CompetitionForm, {
  CompetitionFormValues,
} from "@/components/dashboard/forms/hr/CompetitionForm";
import { useCreateCompetitionMutation } from "@/redux/services/dashboard/hr/competitionApi";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateCompetition() {
  const t = useTranslations("hr");
  const [createCompetition, { isLoading }] = useCreateCompetitionMutation();

  const handleSubmit = async (data: CompetitionFormValues) => {
    const payload = {
      ...data,
      department: Number(data.department),
    };

    const response = await createCompetition(payload);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("competitions.createCompetition")}
      onSubmit={handleSubmit}
      Form={CompetitionForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.competitions")}`}
      isLoading={isLoading}
    />
  );
}
