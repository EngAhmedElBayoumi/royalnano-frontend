"use client";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateInterviewMutation } from "@/redux/services/dashboard/hr/interviewsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import InterviewsForm, {
  InterviewFormValues,
} from "@/components/dashboard/forms/hr/InterviewForm";

export default function CreateInterview() {
  const t = useTranslations("hr.interviews");
  const [createInterview, { isLoading }] = useCreateInterviewMutation();

  const handleSubmit = async (data: InterviewFormValues) => {
    const response = await createInterview({
      ...data,
      interview_date: format(data.interview_date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    });
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("addInterview")}
      onSubmit={handleSubmit}
      Form={InterviewsForm}
      redirectPath="/dashboard/hr?tab=interviews"
      isLoading={isLoading}
    />
  );
}
