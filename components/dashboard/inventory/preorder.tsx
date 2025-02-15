"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetPreorderQuery } from "@/redux/services/dashboard/preorderApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";

export interface Item {
  item: {
    item_code: string;
    item_name: string;
  };
  preorder_level: number;
  description: string;
  id: string;
}

export default function Preorder() {
  const { isLoading, error, data: inventoryItems } = useGetPreorderQuery({});
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

  const formattedData =
    inventoryItems?.results?.map((item: Item) => ({
      id: item.id,
      itemCode: item.item.item_code,
      preorderLevel: item.preorder_level,
      description: item.description,
    })) || [];
  const handleClick = () => {
    router.push("/dashboard/inventory/preorder/create");
  };

  return (
    <>
      {isLoading ? (
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
          emptyMessage="no preorder data found"
          editRoute="/dashboard/inventory/preorder/edit/"
          data={formattedData}
          rows={10}
          detailsRoute="/dashboard/inventory/preorder/"
          columns={columns}
          cardData={cardsData}
          buttonText="Add Preorder"
          ButtonEvent={handleClick}
        />
      )}
    </>
  );
}
