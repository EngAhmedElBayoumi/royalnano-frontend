"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";

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
    { field: "unit", header: "unit" },
    { field: "purchase_price", header: "purchase price" },
    { field: "selling_price", header: "selling price" },
    { field: "quantity", header: "quantity" },
    { field: "description", header: "description" },
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

  if (error) return <div>Error loading items</div>;

  return (
    <div className="px-6 pb-25">
      {isLoading ? (
        <div className="bg-dashboardBg px-4 pt-4 pb-1 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] card mb-5 ">
          <CardsSkelton />
          <TableSkelton />
        </div>
      ) : error ? (
        <div className="flex justify-center flex-col items-center bg-dashboardBg pb-10 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] card mb-5">
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
        EmptyMessage="no items data found"

          editRoute="/dashboard/inventory/items/edit/"
          data={data.results}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Item"
          ButtonEvent={handleClick}
        />
      )}
    </div>
  );
}
