"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function Movement() {
  const router = useRouter();

  const columns = [
    { field: "itemCode", header: "Item Code" },
    { field: "quantity", header: "Quantity" },
    { field: "movement", header: "Movement" },
    { field: "date", header: "Date" },
  ];

  const movementData = [
    {
      id: 1,
      itemCode: "1",
      quantity: 100000,
      movement: "Inbound Movement",
      date: "Dec. 3204",
    },
    {
      id: 2,
      itemCode: "2",
      quantity: 200,
      movement: "Storage Movement",
      date: "Dec. 3204",
    },
    {
      id: 3,
      itemCode: "3",
      quantity: 3000,
      movement: "Picking Movement",
      date: "Dec. 3204",
    },
    {
      id: 4,
      itemCode: "4",
      quantity: 50000,
      movement: "Internal Transfer Movement",
      date: "Dec. 3204",
    },
    {
      id: 5,
      itemCode: "5",
      quantity: 100,
      movement: "Outbound Movement",
      date: "Dec. 3204",
    },
    {
      id: 6,
      itemCode: "6",
      quantity: 10,
      movement: "Inventory Movement",
      date: "Dec. 3204",
    },
    {
      id: 7,
      itemCode: "7",
      quantity: 8000,
      movement: "Internal Transfer Movement",
      date: "Dec. 3204",
    },
    {
      id: 8,
      itemCode: "8",
      quantity: 70,
      movement: "Internal Transfer Movement",
      date: "Dec. 3204",
    },
    {
      id: 9,
      itemCode: "9",
      quantity: 99000,
      movement: "Internal Transfer Movement",
      date: "Dec. 3204",
    },
    {
      id: 10,
      itemCode: "10",
      quantity: 10236,
      movement: "Internal Transfer Movement",
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
    router.push("/dashboard/inventory/movement/create");
  };

  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/movement/edit/"
        data={movementData}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Movement"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
