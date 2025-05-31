"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useUpdateDepartmentMutation,
  useGetDepartmentByIdQuery,
} from "@/redux/services/dashboard/hr/departmentApi";
import EditPage from "@/components/dashboard/EditPage";
import DepartmentForm, {
  DepartmentFormValues,
} from "@/components/dashboard/forms/hr/DepartmentForm";

export default function EditDepartment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr.departments");
  const { data, isLoading, error } = useGetDepartmentByIdQuery(id);
  const [updateDepartment, { isLoading: submitting }] =
    useUpdateDepartmentMutation();

  const defaultValues = data && {
    ...data,
  };

  const handleSubmit = async (data: DepartmentFormValues) => {
    const response = await updateDepartment({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editDepartment")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={DepartmentForm}
      redirectPath="/dashboard/hr"
    />
  );
}
