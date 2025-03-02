"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetItemCategoryQuery } from "@/redux/services/dashboard/inventory/itemCategoryApi";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import CustomTable from "@/components/dashboard/tables/CustomTable";

export default function Category() {
  const {
    isLoading,
    error,
    data: itemCategories,
  } = useGetItemCategoryQuery({});

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
        />
      )}
    </>
  );
}
