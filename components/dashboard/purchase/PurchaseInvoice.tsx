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
  const t = useTranslations("Purchase.Invoice");

  const columns = [
    { field: "itemCode", header: t("itemCode") },
    { field: "PurchaseInvoiceLevel", header: t("purchaseInvoiceLevel") },
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
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-invoice/edit/"
      viewRoute="/dashboard/purchase/purchase-invoice/view/"
      buttonText={t("addInvoice")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}