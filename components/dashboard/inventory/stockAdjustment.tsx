"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";
import { useGetStockAdjustmentsQuery } from "@/redux/services/dashboard/stockApi";
import Image from "next/image";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";

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

  const {
    data: stockAdjustmentData = { results: [] },
    isLoading,
    error,
  } = useGetStockAdjustmentsQuery({
    search: "",
    ordering: "id",
    page: 1,
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
    { field: "itemName", header: "Item Name" },
    { field: "quantity", header: "Quantity" },
    { field: "reason", header: "Reason" },
    { field: "type", header: "Type" },
    { field: "date", header: "Adjustment Date" },
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
    <div className="flex justify-center flex-col items-center pb-10">
      <Image
        src="/assets/icons/dashboard/loading-error.svg"
        alt="loading error"
        width="400"
        height="300"
      />
      Error loading data
    </div>
  ) : (
    <CustomTable
      emptyMessage="no stock adjustment data found"
      viewRoute="/dashboard/inventory/stock-adjustment/view/"
      data={transformedData}
      cardData={cardsData}
      rows={10}
      columns={columns}
      buttonText="Add Stock Adjustment"
      ButtonEvent={handleClick}
    />
  );
}
