"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/redux/services/dashboard/hr/employeeApi";
import EditPage from "@/components/dashboard/EditPage";
import EmployeeForm, {
  EmployeeFormValues,
} from "@/components/dashboard/forms/hr/EmployeeForm";
import { handleApiError } from "@/lib/utils/handleApiError";

export default function EditEmployee() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const { data, isLoading, error } = useGetEmployeeByIdQuery(id);
  const [updateEmployee, { isLoading: submitting }] =
    useUpdateEmployeeMutation();

  const defaultValues: EmployeeFormValues = data && {
    ...data,
    salary: Number(data.salary),
    branch: String(data?.branch?.id),
    department: String(data?.department?.id) || "",
    job_title: String(data?.job_title?.id) || "",
    custom_permissions: data.custom_permissions.map(
      (custom_permission: number) => String(custom_permission)
    ),
    password: "",
  };

  const handleSubmit = async (data: EmployeeFormValues) => {
    const payload = {
      ...data,
      branch: Number(data.branch),
      department: Number(data.department),
      job_title: Number(data.job_title),
    };

    const response = await updateEmployee({ id, data: payload });
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <EditPage
      title={t("employees.editEmployee")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={EmployeeForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.employees")}`}
    />
  );
}
