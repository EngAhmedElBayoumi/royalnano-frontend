"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function StockAdjustment() {
  const router = useRouter();

  const columns = [
    { field: "itemCode", header: "Item Code" },
    { field: "quantity", header: "Quantity" },
    { field: "reason", header: "Reason" },
    { field: "type", header: "Type" },
    { field: "date", header: "Date" },
  ];

  const stockAdjustmentData = [
    {
      id: 1,
      itemCode: "1",
      quantity: 100,
      reason: "Stock Take",
      type: "Increase",
      date: "Dec. 3204",
    },
    {
      id: 2,
      itemCode: "2",
      quantity: 200,
      reason: "Restock",
      type: "Increase",
      date: "Dec. 3204",
    },
    {
      id: 3,
      itemCode: "3",
      quantity: 50,
      reason: "Damaged Goods",
      type: "Decrease",
      date: "Dec. 3204",
    },
    {
      id: 4,
      itemCode: "4",
      quantity: 30,
      reason: "Inventory Adjustment",
      type: "Decrease",
      date: "Dec. 3204",
    },
    {
      id: 5,
      itemCode: "5",
      quantity: 150,
      reason: "Return",
      type: "Increase",
      date: "Dec. 3204",
    },
    {
      id: 6,
      itemCode: "6",
      quantity: 75,
      reason: "Stock Take",
      type: "Decrease",
      date: "Dec. 3204",
    },
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
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/stock-adjustment/edit/"
        data={stockAdjustmentData}
        cardData={cardsData}
        rows={10}
        columns={columns}
        buttonText="Add Stock Adjustment"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
