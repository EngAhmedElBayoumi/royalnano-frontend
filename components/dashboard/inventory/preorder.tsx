"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetPreorderQuery } from "@/redux/services/dashboard/preorderApi";
import { useRouter } from "next/navigation";

export default function Preorder() {
  const { data: inventoryItems } = useGetPreorderQuery({});
  if(inventoryItems){
    console.log("successful...")
    console.log(inventoryItems);}
  const router = useRouter();


  const columns = [
    { field: "itemCode", header: "Item Code" },
    { field: "preorderLevel", header: "Preorder Level" },
    { field: "description", header: "Description" },
    { field: "date", header: "Date" },
  ];

  const data = [
    {
      id: 1,
      itemCode: "1",
      preorderLevel: 4,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 2,
      itemCode: "2",
      preorderLevel: 12,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 3,
      itemCode: "3",
      preorderLevel: 8,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 4,
      itemCode: "4",
      preorderLevel: 9,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 5,
      itemCode: "5",
      preorderLevel: 1,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 6,
      itemCode: "6",
      preorderLevel: 2,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 7,
      itemCode: "7",
      preorderLevel: 7,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 8,
      itemCode: "8",
      preorderLevel: 66,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 9,
      itemCode: "9",
      preorderLevel: 22,
      description: "Lorem Ipsum is simply dummy....",
      date: "Dec. 3204",
    },
    {
      id: 10,
      itemCode: "10",
      preorderLevel: 20,
      description: "Lorem Ipsum is simply dummy....",
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
    router.push("/dashboard/inventory/preorder/create");
  };
  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/preorder/edit/"
        data={data}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Preorder"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
