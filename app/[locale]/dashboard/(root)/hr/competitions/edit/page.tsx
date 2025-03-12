"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CompetitionForm, {
  CompetitionFormValues,
} from "@/components/dashboard/forms/hr/CompetitionForm";
import {
  useGetCompetitionByIdQuery,
  useUpdateCompetitionMutation,
} from "@/redux/services/dashboard/hr/competitionApi";
import EditPage from "@/components/dashboard/EditPage";

export default function EditCompetition() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [updateCompetition] = useUpdateCompetitionMutation();
  const { data, isLoading, error } = useGetCompetitionByIdQuery(id);
  const t = useTranslations("hr");

  const defaultValues = data && {
    ...data,
    department: Number(data.department.id),
    winner: data.winner ? Number(data.winner.id) : undefined,
  };

  const handleSubmit = async (data: CompetitionFormValues) => {
    const payload = {
      ...data,
      department: Number(data.department),
      winner: Number(data.winner),
    };
    const response = await updateCompetition({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("competitions.editCompetition")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={CompetitionForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.competitions")}`}
    />
  );
}
