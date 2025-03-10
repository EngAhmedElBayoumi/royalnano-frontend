"use client";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useCreateInterviewMutation } from "@/redux/services/dashboard/hr/interviewsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import InterviewsForm, {
  InterviewFormValues,
} from "@/components/dashboard/forms/hr/InterviewForm";

export default function CreateInterview() {
  const t = useTranslations("hr");
  const [createInterview] = useCreateInterviewMutation();

  const handleSubmit = async (data: InterviewFormValues) => {
    const response = await createInterview({
      ...data,
      interview_date: format(data.interview_date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    });
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("interviews.addInterview")}
      onSubmit={handleSubmit}
      Form={InterviewsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.interviews")}`}
    />
  );
}
