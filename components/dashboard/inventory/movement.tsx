"use client";
import { useRouter } from "next/navigation";
import { useGetMovementsQuery } from "@/redux/services/dashboard/movementApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
    const [page, setPage] = useState(1);
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };
  
  const router = useRouter();
  const t = useTranslations("Inventory.InventoryMovement");

  const {
    data: movementData = { results: [] },
    isLoading,
    error,
  } = useGetMovementsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  // Transform movementData to only include item_name
  const transformedData = movementData.results.map((movement: Movement) => ({
    ...movement,
    item: movement.item.item_name,
  }));

  const columns = [
    { field: "id", header: "ID" },
    { field: "item", header: t("item") },
    { field: "quantity", header: t("quantity") },
    { field: "movement_date", header: t("date") },
    { field: "movement_type", header: t("movementType") },
    { field: "description", header: t("description") },
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
        <LoadingError />
      ) : (
        <CustomTable
          viewRoute="/dashboard/inventory/movement/view/"
          data={transformedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText={t("addMovement")}
          ButtonEvent={handleClick}
          emptyMessage={t("noMovementsDataFound") || "No movements data found"}
          onPageChange={handlePageChange}
          totalRecords={movementData?.count || 0} 
        />
      )}
    </>
  );
}
