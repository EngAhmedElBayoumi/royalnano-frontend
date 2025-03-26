"use client";
import { useTranslations } from "next-intl";
import { useCreateJobsMutation } from "@/redux/services/dashboard/hr/jobsApi";
import { useGetPermissionsQuery } from "@/redux/services/dashboard/hr/permissionsApi";
import CreatePage from "@/components/dashboard/CreatePage";
import JobsForm, { JobsFormValues } from "@/components/dashboard/forms/hr/JobsForm";

export default function CreateJobs() {
  const jobsT = useTranslations("hr");
  const t = useTranslations("hr.jobs");

  const [createJobs, { isLoading: isCreating }] = useCreateJobsMutation();
  
  const { 
    data: permissionsData, 
    isLoading: isLoadingPermissions,
    error: permissionsError 
  } = useGetPermissionsQuery({});

  const permissionsOptions = permissionsData?.map((permission: { id: number; name: string; }) => ({
    value: permission.id,
    label: permission.name
  })) || [];

  const handleSubmit = async (data: JobsFormValues) => {
    const response = await createJobs(data);
    if (response.error) throw new Error("creation failed");
  
  };

  if (isLoadingPermissions) {
    return "loading";
  }

  if (permissionsError) {
    return <div>{jobsT("errors.fetchPermissionsError")}</div>;
  }

  return (
    <CreatePage
      title={jobsT("addJob")}
      onSubmit={handleSubmit}
      Form={JobsForm}
      formProps={{ permissionsOptions }}
      isLoading={isCreating}
      redirectPath={`/dashboard/hr?tab=${jobsT("jobs")}`}
      successMessage={jobsT("jobCreated")}
      errorMessage={jobsT("errors.createError")}
    />
  );
}