"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateJobsMutation,
  useGetJobsByIdQuery,
} from "@/redux/services/dashboard/hr/jobsApi";
import EditPage from "@/components/dashboard/EditPage";
import JobsForm from "@/components/dashboard/forms/hr/JobsForm";

export default function EditJobs() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
    const t = useTranslations("hr");
  const { data: jobData, isLoading, error } = useGetJobsByIdQuery(id);
  const [updateJobs, { isLoading: submitting }] = useUpdateJobsMutation();
  

  // const defaultValues: BonusesFormValues = data && {
  //   ...data,
  //   employee: Number(data.employee.id),
  //   amount: Number(data.amount),
  // };
  const defaultValues = jobData ? {
    name: jobData.name,
    permissions: jobData.permissions.map((p: { id: { toString: () => number; }; }) => p.id.toString())
  } : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
      const response = await updateJobs({ 
        id: id!, 
        data: {
          name: data.name,
          permissions: data.permissions.map(Number)
        }
      });
      
      if ('error' in response) throw new Error("edit failed");

  };

  

  return (
    <EditPage
      title={t("jobs.editJob")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={JobsForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.jobs")}`}
      
    />
  );
}