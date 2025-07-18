"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateExpenseCategoryMutation } from "@/redux/services/dashboard/purchase/expenseCategory";
import { ExpenseCategoryFormValues } from "@/lib/validations/dashboard/purchase/expenseCategorySchema";
import ExpenseCategoryForm from "@/components/dashboard/forms/purchase/PurchaseExpenseCategoryForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateExpenseCategory() {
  const t = useTranslations("purchase.ExpenseCategory");
  const [createExpenseCategory, { isLoading }] =
    useCreateExpenseCategoryMutation();

  const handleSubmit = async (data: ExpenseCategoryFormValues) => {
    const response = await createExpenseCategory(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addExpenseCategory")}
      onSubmit={handleSubmit}
      Form={ExpenseCategoryForm}
      redirectPath="/dashboard/purchase?tab=expense-category"
      isLoading={isLoading}
    />
  );
}
