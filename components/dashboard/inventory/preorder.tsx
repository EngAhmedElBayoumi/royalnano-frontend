"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetPreorderQuery } from "@/redux/services/dashboard/preorderApi";
import { useRouter } from "next/navigation";

interface Item {
  item: {
    item_code: string;
  };
  preorder_level: number;
  description: string;
  id:string
}


export default function Preorder() {
  const { data: inventoryItems } = useGetPreorderQuery({});
  if (inventoryItems) {
    console.log("successful...");
    console.log(inventoryItems);
  }

  const router = useRouter();

  const columns = [
    { field: "itemCode", header: "Item Code" },
    { field: "preorderLevel", header: "Preorder Level" },
    { field: "description", header: "Description" },
    // { field: "date", header: "Date" },
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

  const formattedData = inventoryItems?.results?.map((item: Item) => ({
    id: item.id, 
    itemCode: item.item.item_code,
    preorderLevel: item.preorder_level,
    description: item.description,
  })) || [];

  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/preorder/edit/"
        data={formattedData}
        rows={10}
        detailsRoute="/dashboard/inventory/preorder/"
        columns={columns}
        cardData={cardsData}
        buttonText="Add Preorder"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
