"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useRouter } from "next/navigation";

export default function Category() {
  const router = useRouter();

  const columns = [
    { field: "categoryModel", header: "Category Models" },
    { field: "date", header: "Date" },
  ];

  const yourCustomerData = [
    { id: 1, categoryModel: "Model A", date: "Dec. 3204" },
    { id: 2, categoryModel: "Model B", date: "Dec. 3204" },
    { id: 3, categoryModel: "Model C", date: "Dec. 3204" },
    { id: 4, categoryModel: "Model D", date: "Dec. 3204" },
    { id: 5, categoryModel: "Model E", date: "Dec. 3204" },
    { id: 6, categoryModel: "Model F", date: "Dec. 3204" },
    { id: 7, categoryModel: "Model G", date: "Dec. 3204" },
    { id: 8, categoryModel: "Model H", date: "Dec. 3204" },
    { id: 9, categoryModel: "Model I", date: "Dec. 3204" },
    { id: 10, categoryModel: "Model J", date: "Dec. 3204" },
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
        data={yourCustomerData}
        rows={10}
        columns={columns}
        cardData={cardsData}
        buttonText="Add Category model"
        ButtonEvent={handleClick}
      />
    </div>
  );
}
