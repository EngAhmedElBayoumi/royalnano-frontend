"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetPreorderQuery } from "@/redux/services/dashboard/inventory/preorderApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useState } from "react";

export interface Item {
  item: {
    id: number;
    item_code: string;
    item_name: string;
  };
  preorder_level: number;
  description: string;
  id: string;
}

export default function Preorder() {
    const [page, setPage] = useState(1);
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };
  const { isLoading, error, data: inventoryItems } = useGetPreorderQuery({ search: "",
    ordering: "id",
    page,
    page_size: 10,});

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryPreorder");

  const columns = [
    { field: "itemCode", header: t("item") },
    { field: "preorderLevel", header: t("preorderLevel") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const formattedData =
    inventoryItems?.results?.map((item: Item) => ({
      id: item.id,
      itemCode: item.item.item_code,
      preorderLevel: item.preorder_level,
      description: item.description,
    })) || [];
  const handleClick = () => {
    router.push("/dashboard/inventory/preorder/create");
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
          emptyMessage={t("noPreorderDataFound")}
          editRoute="/dashboard/inventory/preorder/edit/"
          data={formattedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText={t("addPreorder")}
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          totalRecords={inventoryItems?.count || 0} 
        />
      )}
    </>
  );
}
