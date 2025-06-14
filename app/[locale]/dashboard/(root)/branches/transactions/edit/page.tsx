"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useGetBranchTransactionsByIdQuery } from "@/redux/services/dashboard/inventory/branchTransactionsApi";
import { useUpdateBranchTransactionsMutation } from "@/redux/services/dashboard/inventory/branchTransactionsApi";
import { BranchTransactionsFormValues } from "@/lib/validations/dashboard/branches/branchTransactionsSchema";
import BranchTransactionsForm from "@/components/dashboard/forms/branches/BranchTransactionsForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditBranchTransaction() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("branches.branches_transactions");
  const { data, isLoading, error } = useGetBranchTransactionsByIdQuery(id);
  const [updateBranchTransaction, { isLoading: submitting }] = useUpdateBranchTransactionsMutation();
 const defaultValues = data && {
    ...data,
    branch: data.branch.id,
  };

  const handleSubmit = async (data: BranchTransactionsFormValues) => {
    // Create FormData instance to handle file upload
    const formData = new FormData();

  // Append text fields
    formData.append("transaction_type", data.transaction_type);
    formData.append("amount", data.amount);
    formData.append("branch", String(data.branch));
    formData.append("description", data.description ?? "");

    // Append image file if it exists
    if (data.reset_image && data.reset_image instanceof File)
      formData.append("reset_image", data.reset_image);

    const response = await updateBranchTransaction({ id, data: formData });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("edit_branch_transaction")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={BranchTransactionsForm}
      redirectPath="/dashboard/branches?tab=branches-transactions"
    />
  );
}
