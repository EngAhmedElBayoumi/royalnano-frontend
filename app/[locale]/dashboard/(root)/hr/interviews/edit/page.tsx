"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {
  useUpdateInterviewMutation,
  useGetInterviewByIdQuery,
} from "@/redux/services/dashboard/hr/interviewsApi";
import EditPage from "@/components/dashboard/EditPage";
import InterviewsForm, {
  InterviewFormValues,
} from "@/components/dashboard/forms/hr/InterviewForm";

export default function EditInterview() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const { data, isLoading, error } = useGetInterviewByIdQuery(id);
  const [updateInterview, { isLoading: submitting }] =
    useUpdateInterviewMutation();

  const defaultValues = data && {
    ...data,
    interview_date: new Date(data.interview_date),
    applicant: Number(data.applicant.id),
    interviewers: data.interviewers.map((interviewer: { id: string }) =>
      String(interviewer.id)
    ),
  };

  const handleSubmit = async (data: InterviewFormValues) => {
    const response = await updateInterview({
      id,
      data: {
        ...data,
        interview_date: format(data.interview_date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      },
    });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("interviews.editInterview")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={InterviewsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.interviews")}`}
    />
  );
}
