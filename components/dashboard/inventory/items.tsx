"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";

export default function Items() {
  const router = useRouter();
  const t = useTranslations("Inventory.InventoryItem");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "inventoryitem",
      useQueryHook: useGetItemsQuery,
    });
  const transformedData = data?.results?.map((item) => ({
    ...item,
    unit: item.unit.name,
  }));

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

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      emptyMessage={t("noItemsDataFound") || "No items data found"}
      editRoute="/dashboard/inventory/items/edit/"
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addItem")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
