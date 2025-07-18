"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetExpenseCategorysQuery } from "@/redux/services/dashboard/purchase/expenseCategory";

export interface ExpenseCategory {
  id: number;
  name: string;
  description: string;
}

export default function PurchaseExpenseCategory() {
  const {
    data: expenseCategories,
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "expensecategory",
    useQueryHook: useGetExpenseCategorysQuery,
  });

  const router = useRouter();
  const t = useTranslations("purchase.ExpenseCategory");

  const columns = [
    { field: "name", header: t("name") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: t("cards.totalCategories"), num: expenseCategories?.count || 0 },
    {
      title: t("cards.activeCategories"),
      num: expenseCategories?.results?.length || 0,
    },
    {
      title: t("cards.withDescription"),
      num:
        expenseCategories?.results?.filter(
          (cat: ExpenseCategory) =>
            cat.description && cat.description.trim() !== ""
        ).length || 0,
    },
    {
      title: t("cards.recentlyAdded"),
      num: expenseCategories?.results?.slice(-7).length || 0,
    },
  ];

  const formattedData =
    expenseCategories?.results?.map((category: ExpenseCategory) => ({
      id: category.id,
      name: category.name || "-",
      description: category.description || "-",
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/expense-category/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: expenseCategories?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/expense-category/edit"
      viewRoute="/dashboard/purchase/expense-category/view"
      buttonText={t("addExpenseCategory")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
