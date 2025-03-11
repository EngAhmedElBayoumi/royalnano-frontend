"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateDepartmentMutation,
  useGetDepartmentByIdQuery,
} from "@/redux/services/dashboard/hr/departmentApi";
import EditPage from "@/components/dashboard/EditPage";
import DepartmentForm, {
  DepartmentFormValues,
} from "@/components/dashboard/forms/hr/DepartmentForm";

export default function EditDepartment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const { data, isLoading, error } = useGetDepartmentByIdQuery(id);
  const [updateDepartment] = useUpdateDepartmentMutation();

  const defaultValues = data && {
    ...data,
  };

  const handleSubmit = async (data: DepartmentFormValues) => {
    const response = await updateDepartment({ id, data });
    if (response.error) throw new Error("edit failed");
    router.push(`/dashboard/hr?tab=${t("tabs.departments")}`);
  };

  return (
    <EditPage
      title={t("departments.editDepartment")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={DepartmentForm}
    />
  );
}
