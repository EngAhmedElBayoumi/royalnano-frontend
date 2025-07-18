"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { ExpenseCategoryFormValues } from "@/lib/validations/dashboard/purchase/expenseCategorySchema";
import {
  useGetExpenseCategoryByIdQuery,
  useUpdateExpenseCategoryMutation,
} from "@/redux/services/dashboard/purchase/expenseCategory";
import ExpenseCategoryForm from "@/components/dashboard/forms/purchase/PurchaseExpenseCategoryForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditExpenseCategory() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("purchase.ExpenseCategory");

  const { data, isLoading, error } = useGetExpenseCategoryByIdQuery(id);
  const [updateExpenseCategory, { isLoading: submitting }] =
    useUpdateExpenseCategoryMutation();

  const handleSubmit = async (data: ExpenseCategoryFormValues) => {
    const response = await updateExpenseCategory({
      id,
      data,
    });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editExpenseCategory")}
      data={data}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={ExpenseCategoryForm}
      submitting={submitting}
      redirectPath="/dashboard/purchase?tab=expense-category"
    />
  );
}
