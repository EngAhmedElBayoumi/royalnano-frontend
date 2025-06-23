"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetInvoicesQuery } from "@/redux/services/dashboard/purchase/invoiceApi";

// export interface Item {
//   item: {
//     id: number;
//     item_code: string;
//     item_name: string;
//   };
//   created_at: string;
//   PurchaseInvoice_level: number;
//   description: string;
//   id: string;
// }

export default function PurchaseInvoice() {
  const {
    data: inventoryItems,
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "invoicedetail",
    useQueryHook: useGetInvoicesQuery,
  });

  const router = useRouter();
  const t = useTranslations("Purchase.Invoice");

  const columns = [
    { field: "invoiceNumber", header: t("invoiceNumber") },
    { field: "status", header: t("status") },
    { field: "description", header: t("description") },
    { field: "dueDate", header: t("dueDate") },
    { field: "createdAt", header: t("createdAt") },
    { field: "voucherDate", header: t("voucherDate") },
    // { field: "prefix", header: t("prefix") },
    { field: "totalAmount", header: t("totalAmount") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];

  const formattedData =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inventoryItems?.results?.map((invoice: any) => ({
      id: invoice.id,
      invoiceNumber: invoice.invoice_number || "-",
      status: invoice.status || "-",
      description: invoice.description || "-",
      dueDate: invoice.due_date || "-",
      createdAt: invoice.created_at || "-",
      voucherDate: invoice.voucher_date || "-",
      prefix: invoice.prefix || "-",
      totalAmount: invoice.total_amount || "0.00",
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
