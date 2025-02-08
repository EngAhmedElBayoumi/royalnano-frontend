"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetItemCategoryQuery } from "@/redux/services/dashboard/itemCategoryApi";
import { useRouter } from "next/navigation";

export default function Category() {
    const { data: itemCategories } = useGetItemCategoryQuery({});
    if (itemCategories){

      console.log(itemCategories);
    }
  const router = useRouter();

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
  ];

 

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/inventory/category-models/create");
  };
  return (
    <div className="px-6 pb-25">
      <CustomTable
        editRoute="/dashboard/inventory/category-models/edit/"
        data={itemCategories}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Category model"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
