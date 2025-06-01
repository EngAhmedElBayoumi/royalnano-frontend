"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useUpdateJobsMutation,
  useGetJobsByIdQuery,
} from "@/redux/services/dashboard/hr/jobsApi";
import JobsForm from "@/components/dashboard/forms/hr/JobsForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditJobs() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr.jobs");
  const { data: jobData, isLoading, error } = useGetJobsByIdQuery(id);
  const [updateJobs, { isLoading: submitting }] = useUpdateJobsMutation();

  const defaultValues = jobData
    ? {
        name: jobData.name,
        permissions: jobData.permissions.map(
          (p: { id: { toString: () => number } }) => p.id.toString()
        ),
      }
    : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    const response = await updateJobs({
      id: id!,
      data: {
        name: data.name,
        permissions: data.permissions.map(Number),
      },
    });

    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editJob")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={JobsForm}
      redirectPath="/dashboard/hr?tab=jobs"
    />
  );
}
