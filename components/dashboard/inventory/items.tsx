"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";
import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";

export default function Items() {
  const router = useRouter();

  const { data, isLoading, error } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const columns = [
    { field: "item_code", header: "Item Code" },
    { field: "item_name", header: "Item Name" },
    { field: "category", header: "category" },
    { field: "unit", header: "unit" },
    { field: "purchase_price", header: "purchase_price" },
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/items/edit/"
        data={data.results}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Item"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
