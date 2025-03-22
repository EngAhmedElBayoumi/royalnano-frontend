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
    };

    const response = await createEmployee(payload);
    if (response.error) throw new Error("creation failed");
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
