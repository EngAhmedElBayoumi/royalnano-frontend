"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetExpenseCategorysQuery } from "@/redux/services/dashboard/purchase/expese-category";

export interface Item {
  item: {
    id: number;
    item_code: string;
    item_name: string;
  };
  PurchaseExpenseCategory_level: number;
  description: string;
  id: string;
}

export default function PurchaseExpenseCategory() {
  const { data: inventoryItems, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "PurchaseExpenseCategory",
    useQueryHook: useGetExpenseCategorysQuery,
  });

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryPurchaseExpenseCategory");

  const columns = [
    { field: "itemCode", header: t("item") },
    { field: "PurchaseExpenseCategoryLevel", header: t("PurchaseExpenseCategoryLevel") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const formattedData =
    inventoryItems?.results?.map((item: Item) => ({
      id: item.id,
      itemCode: item.item.item_code,
      PurchaseExpenseCategoryLevel: item.PurchaseExpenseCategory_level,
      description: item.description,
    })) || [];
  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-expense-catogory/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: inventoryItems?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noPurchaseExpenseCategoryDataFound")}
      editRoute="/dashboard/purchase/purchase-expense-catogory/edit/"
      viewRoute="/dashboard/purchase/purchase-expense-catogory/view/"
      buttonText={t("addPurchaseExpenseCategory")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
