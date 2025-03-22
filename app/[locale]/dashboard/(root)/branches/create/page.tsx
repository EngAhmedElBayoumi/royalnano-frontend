"use client";
import { useTranslations } from "next-intl";
import { useCreateBranchMutation } from "@/redux/services/dashboard/inventory/branchesApi";
import CreatePage from "@/components/dashboard/CreatePage";
import BranchForm, {
  BranchFormValues,
} from "@/components/dashboard/forms/BranchForm";

export default function CreateBranchs() {
  const t = useTranslations("branches");
  const [createBranch, { isLoading }] = useCreateBranchMutation();

  const handleSubmit = async (data: BranchFormValues) => {
    const payload = {
      ...data,
      manager: Number(data.manager),
    };
    const response = await createBranch(payload);
    if (response.error) throw new Error("creation failed");
  };

  return (
    <CreatePage
      title={t("addBranch")}
      onSubmit={handleSubmit}
      Form={BranchForm}
      redirectPath="/dashboard/branches"
      isLoading={isLoading}
    />
  );
}
