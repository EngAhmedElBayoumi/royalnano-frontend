"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateJobsMutation } from "@/redux/services/dashboard/hr/jobsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import JobsForm, {
  JobsFormValues,
} from "@/components/dashboard/forms/hr/JobsForm";

export default function CreateJobs() {
  const t = useTranslations("hr");

  const [createJobs, { isLoading }] = useCreateJobsMutation();

  const handleSubmit = async (data: JobsFormValues) => {
    const response = await createJobs(data);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("jobs.addJob")}
      onSubmit={handleSubmit}
      Form={JobsForm}
      isLoading={isLoading}
      redirectPath={`/dashboard/hr?tab=${t("tabs.jobs")}`}
    />
  );
}
