"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetInvoicesQuery } from "@/redux/services/dashboard/purchase/invoiceApi";

export default function PurchaseInvoice() {
  const {
    data: invoices,
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
    { field: "invoice_number", header: t("invoiceNumber") },
    { field: "supplier_name", header: t("supplier") },
    { field: "branch_name", header: t("branch") },
    { field: "warehouse_name", header: t("warehouse") },
    { field: "status", header: t("status") },
    { field: "voucher_date", header: t("voucherDate") },
    { field: "due_date", header: t("dueDate") },
    { field: "total_amount", header: t("totalAmount") },
  ];

  const cardsData = [
    { title: t("cards.draft"), num: invoices?.results?.filter((inv: any) => inv.status === 'draft').length || 0 },
    { title: t("cards.pending"), num: invoices?.results?.filter((inv: any) => inv.status === 'pending').length || 0 },
    { title: t("cards.approved"), num: invoices?.results?.filter((inv: any) => inv.status === 'approved').length || 0 },
    { title: t("cards.paid"), num: invoices?.results?.filter((inv: any) => inv.status === 'paid').length || 0 },
    { title: t("cards.cancelled"), num: invoices?.results?.filter((inv: any) => inv.status === 'cancelled').length || 0 },
  ];

  const formattedData =
    invoices?.results?.map((invoice: any) => ({
      id: invoice.id,
      invoice_number: invoice.invoice_number || "-",
      supplier_name: invoice.supplier?.supplier_name || "N/A",
      branch_name: invoice.branch?.name || "N/A",
      warehouse_name: invoice.warehouse?.name || "N/A",
      status: invoice.status || "pending",
      voucher_date: invoice.voucher_date || "-",
      due_date: invoice.due_date || "-",
      total_amount: invoice.total_amount || "0.00",
      description: invoice.description || "-",
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/invoice/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: invoices?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/invoice/edit"
      buttonText={t("addInvoice")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}

