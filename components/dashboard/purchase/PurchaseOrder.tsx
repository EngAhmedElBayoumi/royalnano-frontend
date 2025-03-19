"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetOrdersQuery } from "@/redux/services/dashboard/purchase/orderApi";

export interface Item {
  item: {
    id: number;
    item_code: string;
    item_name: string;
  };
  PurchaseOrder_level: number;
  description: string;
  id: string;
}

export default function PurchaseOrder() {
  const { data: inventoryItems, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "PurchaseOrder",
    useQueryHook: useGetOrdersQuery,
  });

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryPurchaseOrder");

  const columns = [
    { field: "itemCode", header: t("item") },
    { field: "PurchaseOrderLevel", header: t("PurchaseOrderLevel") },
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
      PurchaseOrderLevel: item.PurchaseOrder_level,
      description: item.description,
    })) || [];
  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-order/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: inventoryItems?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noPurchaseOrderDataFound")}
      editRoute="/dashboard/purchase/purchase-order/edit/"
      viewRoute="/dashboard/purchase/purchase-order/view/"
      buttonText={t("addPurchaseOrder")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
