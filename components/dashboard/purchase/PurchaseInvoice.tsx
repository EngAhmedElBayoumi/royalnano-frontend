"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetInvoicesQuery } from "@/redux/services/dashboard/purchase/invoiceApi";

export interface Item {
  item: {
    id: number;
    item_code: string;
    item_name: string;
  };
  PurchaseInvoice_level: number;
  description: string;
  id: string;
}

export default function PurchaseInvoice() {
  const { data: inventoryItems, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "PurchaseInvoice",
    useQueryHook: useGetInvoicesQuery,
  });

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryPurchaseInvoice");

  const columns = [
    { field: "itemCode", header: t("item") },
    { field: "PurchaseInvoiceLevel", header: t("PurchaseInvoiceLevel") },
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
      PurchaseInvoiceLevel: item.PurchaseInvoice_level,
      description: item.description,
    })) || [];
  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-invoice/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: inventoryItems?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noPurchaseInvoiceDataFound")}
      editRoute="/dashboard/purchase/purchase-invoice/edit/"
      viewRoute="/dashboard/purchase/purchase-invoice/view/"
      buttonText={t("addPurchaseInvoice")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
