"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useGetExpenseCategoryByIdQuery } from "@/redux/services/dashboard/purchase/expenseCategory";
import ExpenseCategoryForm, { ExpenseCategoryFormValues } from "@/components/dashboard/forms/purchase/PurchaseExpenseCategoryForm";
// import ExpenseCategoryForm, {
//   ExpenseCategoryFormValues,
// } from "@/components/dashboard/forms/purchase/ExpenseCategoryForm";

export default function ViewExpenseCategory() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.ExpenseCategory");

  const { data, isLoading, error } = useGetExpenseCategoryByIdQuery(id);
  const defaultValues: ExpenseCategoryFormValues = data && {
    id: data.id,
    name: data.name,
    description: data.description || "", // Handle optional description
  };

  const handleSubmit = async (data: ExpenseCategoryFormValues) => {
    // No submission needed for view-only page
    console.log("View mode - no submission", data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={t("viewExpenseCategory")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : error ? (
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <ExpenseCategoryForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              isView={true}
            />
          </div>
        )}
      </div>
    </main>
  );
}