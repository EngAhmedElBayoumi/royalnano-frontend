"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateBranchTransactionsMutation } from "@/redux/services/dashboard/inventory/branchTransactionsApi";
import { BranchTransactionsFormValues } from "@/lib/validations/dashboard/branches/branchTransactionsSchema";
import BranchTransactionsForm, {
} from "@/components/dashboard/forms/branches/BranchTransactionsForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateBranchTransaction() {
  const [createBranchTransaction, { isLoading }] = useCreateBranchTransactionsMutation();
  const t = useTranslations("branches.branches_transactions");

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

    const response = await createBranchTransaction(formData);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("add_branch_transaction")}
      onSubmit={handleSubmit}
      Form={BranchTransactionsForm}
      redirectPath="/dashboard/branches?tab=branches_transactions"
      isLoading={isLoading}
    />
  );
}
