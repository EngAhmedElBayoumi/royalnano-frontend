"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetRequestsQuery } from "@/redux/services/dashboard/purchase/request";

export interface Item {
  item: {
    id: number;
    item_code: string;
    item_name: string;
  };
  PurchaseRequest_level: number;
  description: string;
  id: string;
}

export default function PurchaseRequest() {
  const { data: inventoryItems, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "PurchaseRequest",
    useQueryHook: useGetRequestsQuery,
  });

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryPurchaseRequest");

  const columns = [
    { field: "itemCode", header: t("item") },
    { field: "PurchaseRequestLevel", header: t("PurchaseRequestLevel") },
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
      PurchaseRequestLevel: item.PurchaseRequest_level,
      description: item.description,
    })) || [];
  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-request/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: inventoryItems?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noPurchaseRequestDataFound")}
      editRoute="/dashboard/purchase/purchase-request/edit/"
      viewRoute="/dashboard/purchase/purchase-request/view/"
      buttonText={t("addPurchaseRequest")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
