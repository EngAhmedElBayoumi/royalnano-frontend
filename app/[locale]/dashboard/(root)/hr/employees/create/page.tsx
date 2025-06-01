"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateEmployeeMutation } from "@/redux/services/dashboard/hr/employeeApi";
import CreatePage from "@/components/dashboard/CreatePage";
import EmployeeForm, {
  EmployeeFormValues,
} from "@/components/dashboard/forms/hr/EmployeeForm";

export default function CreateEmployee() {
  const t = useTranslations("hr");
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const handleSubmit = async (data: EmployeeFormValues) => {
    const payload = {
      ...data,
      branch: Number(data.branch),
      department: Number(data.department),
      job_title: Number(data.job_title),
    };

    const response = await createEmployee(payload);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("employees.addEmployee")}
      onSubmit={handleSubmit}
      Form={EmployeeForm}
      redirectPath="/dashboard/hr?tab=employees"
      isLoading={isLoading}
    />
  );
}
