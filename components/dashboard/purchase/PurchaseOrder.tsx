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
  const { data: purchaseOrders, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "purchaseorder",
    useQueryHook: useGetOrdersQuery,
  });

  const router = useRouter();
  const t = useTranslations("Purchase.Order");

  const columns = [
    { field: "itemCode", header: t("itemCode") },
    { field: "PurchaseOrderLevel", header: t("purchaseOrderLevel") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];
console.log(purchaseOrders?.results)
  const formattedData =
    purchaseOrders?.results?.map((item: Item) => ({
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
      data={{ results: formattedData, count: purchaseOrders?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-order/edit/"
      viewRoute="/dashboard/purchase/purchase-order/view/"
      buttonText={t("addOrder")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}