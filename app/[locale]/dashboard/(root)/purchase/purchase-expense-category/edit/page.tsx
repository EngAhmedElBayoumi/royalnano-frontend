"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import EditPage from "@/components/dashboard/EditPage";
// import ExpenseCategoryForm, {
//   ExpenseCategoryFormValues,
// } from "@/components/dashboard/forms/purchase/ExpenseCategoryForm";
import {
  useGetExpenseCategoryByIdQuery,
  useUpdateExpenseCategoryMutation,
} from "@/redux/services/dashboard/purchase/expenseCategory";
import ExpenseCategoryForm, { ExpenseCategoryFormValues } from "@/components/dashboard/forms/purchase/PurchaseExpenseCategoryForm";

export default function EditExpenseCategory() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.ExpenseCategory");
  const { data, isLoading, error } = useGetExpenseCategoryByIdQuery(id);
  const [updateExpenseCategory, { isLoading: submitting }] = useUpdateExpenseCategoryMutation();

  const defaultValues: ExpenseCategoryFormValues = data && {
    id: data.id,
    name: data.name,
    description: data.description || "", // Handle optional description
  };

  const handleSubmit = async (data: ExpenseCategoryFormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
    };
    
    // try {
      const response = await updateExpenseCategory({ id: Number(id), data: payload });
      if ('error' in response) {
        throw new Error("Update failed");
      }
      // return response;
    // } catch (error) {
    //   throw new Error("Update failed");
    // }
  };

  return (
    <EditPage
      title={t("editExpenseCategory")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={ExpenseCategoryForm}
      submitting={submitting}
      redirectPath="/dashboard/purchase?tab=Expense+Category" // Fixed redirect path
    />
  );
}