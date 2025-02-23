"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function Items() {
  const router = useRouter();
  const t = useTranslations("Inventory.InventoryItem");

  const { data, isLoading, error } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const columns = [
    { field: "item_code", header: t("itemCode") },
    { field: "item_name", header: t("itemName") },
    { field: "unit", header: t("unit") },
    { field: "purchase_price", header: t("purchasePrice") },
    { field: "selling_price", header: t("sellingPrice") },
    { field: "quantity", header: t("quantity") },
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
    router.push("/dashboard/inventory/items/create");
  };

  return isLoading ? (
    <>
      <CardsSkelton />
      <TableSkelton />
    </>
  ) : error ? (
    <LoadingError />
  ) : (
    <CustomTable
      emptyMessage={t("noItemsDataFound") || "No items data found"}
      editRoute="/dashboard/inventory/items/edit/"
      data={data.results}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addItem")}
      ButtonEvent={handleClick}
    />
  );
}
