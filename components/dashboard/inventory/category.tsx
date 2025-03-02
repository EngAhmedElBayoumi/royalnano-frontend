"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetItemCategoryQuery } from "@/redux/services/dashboard/inventory/itemCategoryApi";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useState } from "react";

export default function Category() {
      const [page, setPage] = useState(1);
      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };
  const {
    isLoading,
    error,
    data: itemCategories,
  } = useGetItemCategoryQuery({search: "",
    ordering: "id",
    page,
    page_size: 10,});

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryCategory");

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: t("categoryName") },
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
          emptyMessage="no customer requests data found"
          editRoute="/dashboard/inventory/category-models/edit/"
          data={itemCategories}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText={t("addCategory")}
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          totalRecords={itemCategories?.count || 0} 
        />
      )}
    </>
  );
}
