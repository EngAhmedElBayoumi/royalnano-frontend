"use client";
import { useTranslations } from "next-intl";
import { useCreateDepartmentMutation } from "@/redux/services/dashboard/hr/departmentApi";
import CreatePage from "@/components/dashboard/CreatePage";
import DepartmentForm, {
  DepartmentFormValues,
} from "@/components/dashboard/forms/hr/DepartmentForm";

export default function CreateDepartment() {
  const t = useTranslations("hr");
  const [createDepartment] = useCreateDepartmentMutation();

  const handleSubmit = async (data: DepartmentFormValues) => {
    const response = await createDepartment(data);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("departments.addDepartment")}
      onSubmit={handleSubmit}
      Form={DepartmentForm}
      redirectPath="/dashboard/hr"
    />
  );
}
