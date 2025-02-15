"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetItemCategoryQuery } from "@/redux/services/dashboard/itemCategoryApi";
import { useRouter } from "next/navigation";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Category() {
  const {
    isLoading,
    error,
    data: itemCategories,
  } = useGetItemCategoryQuery({});
  if (itemCategories) {
    console.log(itemCategories);
  }
  const router = useRouter();
  const t = useTranslations("Add.Inventory");

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
          emptyMessage="no customer requests data found"
          editRoute="/dashboard/inventory/category-models/edit/"
          data={itemCategories}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText={t("categoryModel")}
          ButtonEvent={handleClick}
        />
      )}
    </>
  );
}
