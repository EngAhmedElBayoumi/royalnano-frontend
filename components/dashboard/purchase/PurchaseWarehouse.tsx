"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetWarehousesQuery } from "@/redux/services/dashboard/purchase/warehouseApi";

export interface Item {
  item: {
    id: number;
    item_code: string;
    item_name: string;
  };
  PurchaseWarehouse_level: number;
  description: string;
  id: string;
}

export default function PurchaseWarehouse() {
  const { data: inventoryItems, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "warehouse",
    useQueryHook: useGetWarehousesQuery,
  });

  const router = useRouter();
  const t = useTranslations("Purchase.Warehouse");

  const columns = [
    { field: "itemCode", header: t("itemCode") },
    { field: "PurchaseWarehouseLevel", header: t("purchaseWarehouseLevel") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];

  const formattedData =
    inventoryItems?.results?.map((item: Item) => ({
      id: item.id,
      itemCode: item.item.item_code,
      PurchaseWarehouseLevel: item.PurchaseWarehouse_level,
      description: item.description,
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-warehouse/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: inventoryItems?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-warehouse/edit/"
      viewRoute="/dashboard/purchase/purchase-warehouse/view/"
      buttonText={t("addWarehouse")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}