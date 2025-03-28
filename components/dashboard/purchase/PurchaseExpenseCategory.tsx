"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetExpenseCategorysQuery } from "@/redux/services/dashboard/purchase/expenseCategory";

export interface Item {
  id: number;
  name: string;  // Matches API response
  description: string;
  // Note: API doesn't include item_code or PurchaseExpenseCategory_level
}

export default function PurchaseExpenseCategory() {
  const {
    data: inventoryItems,
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "expensecategory",
    useQueryHook: useGetExpenseCategorysQuery,
  });

  const router = useRouter();
  const t = useTranslations("Purchase.ExpenseCategory");

  const columns = [
    { field: "name", header: t("Name") },  // Using "Name" from translations
    { field: "description", header: t("description") },
    // Removed itemCode and purchaseExpenseCategoryLevel as they're not in API data
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];

  const formattedData =
    inventoryItems?.results?.map((item: Item) => ({
      id: item.id,
      name: item.name,  // Using name from API
      description: item.description,
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-expense-category/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: inventoryItems?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-expense-category/edit/"
      viewRoute="/dashboard/purchase/purchase-expense-category/view/"
      buttonText={t("addExpenseCategory")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}