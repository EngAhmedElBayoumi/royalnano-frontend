"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useUpdateBranchMutation,
  useGetBranchByIdQuery,
} from "@/redux/services/dashboard/inventory/branchesApi";
import EditPage from "@/components/dashboard/EditPage";
import BranchForm, {
  BranchFormValues,
} from "@/components/dashboard/forms/BranchForm";

export default function EditBranch() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("branches.branches_data");
  const { data, isLoading, error } = useGetBranchByIdQuery(id);
  const [updateBranch, { isLoading: submitting }] = useUpdateBranchMutation();

  const defaultValues = data && {
    ...data,
    manager: Number(data.manager),
  };

  const handleSubmit = async (data: BranchFormValues) => {
    const payload = {
      ...data,
      manager: Number(data.manager),
    };
    const response = await updateBranch({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editBranch")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={BranchForm}
      redirectPath="/dashboard/branches"
    />
  );
}
