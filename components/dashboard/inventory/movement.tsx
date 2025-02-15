"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetMovementsQuery } from "@/redux/services/dashboard/movementApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";

// Define the type for movement
interface Movement {
  id: number;
  item: {
    id: number;
    item_name: string;
    item_code: string;
  };
  movement_date: string;
  quantity: number;
  movement_type: string;
  description: string;
}

export default function Movement() {
  const router = useRouter();

  const {
    data: movementData = { results: [] },
    isLoading,
    error,
  } = useGetMovementsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  // Transform movementData to only include item_name
  const transformedData = movementData.results.map((movement: Movement) => ({
    ...movement,
    item: movement.item.item_name,
  }));

  const columns = [
    { field: "id", header: "ID" },
    { field: "item", header: "Item" },
    { field: "movement_date", header: "Movement Date" },
    { field: "quantity", header: "Quantity" },
    { field: "movement_type", header: "Movement Type" },
    { field: "description", header: "Description" },
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
          emptyMessage="no movements data found"
          viewRoute="/dashboard/inventory/movement/view/"
          data={transformedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Movement"
          ButtonEvent={handleClick}
        />
      )}
    </>
  );
}
