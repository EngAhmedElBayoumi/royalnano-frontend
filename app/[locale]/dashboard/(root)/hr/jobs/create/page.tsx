"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateJobsMutation } from "@/redux/services/dashboard/hr/jobsApi";
import JobsForm, {
  JobsFormValues,
} from "@/components/dashboard/forms/hr/JobsForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateJobs() {
  const t = useTranslations("hr.jobs");
  const [createJobs, { isLoading }] = useCreateJobsMutation();

  const handleSubmit = async (data: JobsFormValues) => {
    const response = await createJobs(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addJob")}
      onSubmit={handleSubmit}
      Form={JobsForm}
      isLoading={isLoading}
      redirectPath="/dashboard/hr?tab=jobs"
    />
  );
}
