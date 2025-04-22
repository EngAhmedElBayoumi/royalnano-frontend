"use client";
import { useTranslations } from "next-intl";
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
      if ("data" in response.error) {
        const errorData = response.error.data as Record<string, string[]>;
        const errorMessage = Object.values(errorData).flat().join(", "); // Combine all error messages into a single string
        throw new Error(errorMessage || "An error occurred");
      } else if ("message" in response.error) {
        throw new Error(response.error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  };

  return (
    <CreatePage
      title={t("employees.addEmployee")}
      onSubmit={handleSubmit}
      Form={EmployeeForm}
      redirectPath={`/dashboard/hr?tab=${t("tabs.employees")}`}
      isLoading={isLoading}
    />
  );
}
