"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetStockAdjustmentsQuery } from "@/redux/services/dashboard/inventory/stockApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useState } from "react";

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
   const [page, setPage] = useState(1);
   
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };
  const {
    data: stockAdjustmentData = { results: [] },
    isLoading,
    error,
  } = useGetStockAdjustmentsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
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

  return isLoading ? (
    <>
      <CardsSkelton />
      <TableSkelton />
    </>
  ) : error ? (
    <LoadingError />
  ) : (
    <CustomTable
      emptyMessage="no stock adjustment data found"
      viewRoute="/dashboard/inventory/stock-adjustment/view/"
      data={transformedData}
      cardData={cardsData}
      rows={10}
      columns={columns}
      buttonText={t("addStockAdjustment")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={stockAdjustmentData?.count || 0} 
    />
  );
}
