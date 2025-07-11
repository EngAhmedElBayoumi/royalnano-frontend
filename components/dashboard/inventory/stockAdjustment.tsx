"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetStockAdjustmentsQuery } from "@/redux/services/dashboard/inventory/stockApi";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";

// Define the type for stock adjustment
interface StockAdjustment {
  id: number;
  item: {
    item_code: string;
    item_name?: string; // Optional, add other properties as needed
  };
  quantity_adjusted: number;
  reason: string;
  adjustment_type: string;
  adjustment_date: string;
}

export default function StockAdjustment() {
  const router = useRouter();
  const t = useTranslations("Inventory.InventoryStockAdjustment");

  const {
    data: stockAdjustmentData = { results: [] },
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "stockadjustment",
    useQueryHook: useGetStockAdjustmentsQuery,
  });

  const transformedData = stockAdjustmentData.results.map(
    (adjustment: StockAdjustment) => ({
      id: adjustment.id,
      itemName: adjustment.item.item_name,
      quantity: adjustment.quantity_adjusted,
      reason: adjustment.reason,
      type: adjustment.adjustment_type,
      date: adjustment.adjustment_date,
    })
  );

  const columns = [
    { field: "itemName", header: t("item") },
    { field: "quantity", header: t("quantityAdjusted") },
    { field: "reason", header: t("reason") },
    { field: "type", header: t("adjustmentType") },
    { field: "date", header: t("date") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/inventory/stock-adjustment/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{
        results: transformedData,
        count: stockAdjustmentData?.count || 0,
      }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={
        t("noStockAdjustmentsDataFound") || "No stock adjustment data found"
      }
      editRoute="/dashboard/inventory/stock-adjustment/edit"
      viewRoute="/dashboard/inventory/stock-adjustment/view"
      buttonText={t("addStockAdjustment")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
