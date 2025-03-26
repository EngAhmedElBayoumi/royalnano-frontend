"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateJobsMutation,
  useGetJobsByIdQuery,
} from "@/redux/services/dashboard/hr/jobsApi";
import { useGetPermissionsQuery } from "@/redux/services/dashboard/hr/permissionsApi";
import EditPage from "@/components/dashboard/EditPage";
import JobsForm from "@/components/dashboard/forms/hr/JobsForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function EditJobs() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const globalT = useTranslations();
  const jobsT = useTranslations("hr.jobs");
  const errorsT = useTranslations("hr.errors");

  // Fetch job data
  const { data: jobData, isLoading, error } = useGetJobsByIdQuery(id);
  
  // Fetch permissions data
  const { 
    data: permissionsData, 
    isLoading: isLoadingPermissions,
    error: permissionsError 
  } = useGetPermissionsQuery({});

  const [updateJobs, { isLoading: submitting }] = useUpdateJobsMutation();

  // Prepare permissions options for MultiSelect
  const permissionsOptions = permissionsData?.map((permission) => ({
    value: permission.id.toString(),
    label: permission.name
  })) || [];

  // Prepare default values for the form
  const defaultValues = jobData ? {
    name: jobData.name,
    permissions: jobData.permissions.map(p => p.id.toString())
  } : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    // try {
      const response = await updateJobs({ 
        id: id!, 
        data: {
          name: data.name,
          permissions: data.permissions.map(Number)
        }
      });
      if ('error' in response) throw new Error(errorsT("updateError"));
    //   return response;
    // } catch (error) {
    //   throw error;
    // }
  };

  if (isLoading || isLoadingPermissions) {
    return <LoadingSpinner />;
  }

  if (error || permissionsError) {
    return <div>{error ? errorsT("fetchError") : errorsT("fetchPermissionsError")}</div>;
  }

  return (
    <EditPage
      title={jobsT("editJob")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={JobsForm}
      formProps={{ permissionsOptions }}  // Pass additional props here
      redirectPath={`/dashboard/hr?tab=${globalT("hr.tabs.jobs")}`}
      successMessage={jobsT("jobUpdated")}
      errorMessage={errorsT("updateError")}
    />
  );
}