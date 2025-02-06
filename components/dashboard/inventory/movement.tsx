"use client";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetMovementsQuery } from "@/redux/services/dashboard/movementApi";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movements</div>;

  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/movement/edit/"
        data={movementData.results}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Movement"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
