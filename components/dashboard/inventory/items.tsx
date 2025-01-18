"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function Items() {
  const router = useRouter();

  const columns = [
    { field: "itemCode", header: "Item Code" },
    { field: "itemName", header: "Item Name" },
    { field: "quantity", header: "Quantity" },
    { field: "price", header: "Price" },
    { field: "date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      itemCode: "1",
      itemName: "Red",
      quantity: "100000",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 2,
      itemCode: "2",
      itemName: "Red",
      quantity: "200",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 3,
      itemCode: "3",
      itemName: "Red",
      quantity: "3000",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 4,
      itemCode: "4",
      itemName: "Red",
      quantity: "50000",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 5,
      itemCode: "5",
      itemName: "Red",
      quantity: "100",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 6,
      itemCode: "6",
      itemName: "Red",
      quantity: "10",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 7,
      itemCode: "7",
      itemName: "Red",
      quantity: "6000",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 8,
      itemCode: "8",
      itemName: "Red",
      quantity: "70",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 9,
      itemCode: "9",
      itemName: "Red",
      quantity: "95000",
      price: "10,000 LE",
      date: "Dec. 3204",
    },
    {
      id: 10,
      itemCode: "10",
      itemName: "Red",
      quantity: "10236",
      price: "10,000 LE",
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
    router.push("/dashboard/inventory/items/create");
  };
  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/items/edit/"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Item"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
