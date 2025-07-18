import React from 'react'
import TableWrapper from '../tables/TableWrapper';
import { useTableData } from '@/hooks/useTableData';
import { useTranslations } from 'next-intl';
import { useGetReceiptVouchersQuery } from '@/redux/services/dashboard/finance/receiptVoucherApi';
import LoadingError from '../LoadingError';
import { useRouter } from 'next/navigation';
export interface ReceiptVoucherRow {
  id: number;
  invoice:number ;
  customer:number ;
  account:number ;
  amount_received: string;
  received_date: string;
  reference_number: string;
  status: string;
  notes: string;
}
export default function ReceiptVoucherTab() {
    const router = useRouter();
    const t = useTranslations("finance.receiptVoucher");
    const { data, isLoading, error, handlePageChange } = useTableData({
        permissionKey: "finance",
        useQueryHook: useGetReceiptVouchersQuery,
      });
    const columns = [
        { field: "invoice", header: t("invoice") },
        { field: "customer", header: t("customer") },
        { field: "account", header: t("account") },
        { field: "amount_received", header: t("amountReceived") },
        { field: "received_date", header: t("receivedDate") },
        { field: "reference_number", header: t("referenceNumber") },
        { field: "status", header: t("status") },
        { field: "notes", header: t("notes") },
    ];
    const receiptVoucherData: ReceiptVoucherRow[] = data?.results?.map((item: ReceiptVoucherRow) => ({
        id: item.id,
        invoice: item.invoice,
        customer: item.customer,
        account: item.account,
        amount_received: item.amount_received,
        received_date: item.received_date,
        reference_number: item.reference_number,
        status: item.status,
        notes: item.notes,
    })) || [];
     if (error) {
        return <LoadingError />;
      }
      const cardsData = [
    { title:"", num: data?.count || 0 },
  ];
    const permissions = {
        canView: true, // Example permission, adjust as needed
        canAdd: true, // Example permission, adjust as needed
        canUpdate: true, // Example permission, adjust as needed
        canDelete: true, // Example permission, adjust as needed
      };
    const handleClick = () => {
        router.push("/dashboard/finance/receipt-voucher/create");
      };

  return (
    <TableWrapper
              isLoading={isLoading}
              error={error}
              data={{ results:receiptVoucherData , count: data?.count || 0 }}
              columns={columns}
              cardData={cardsData}
              emptyMessage={t("noDataFound")}
              editRoute="/dashboard/finance/receipt-voucher/edit"
              buttonText={t("addReceiptVoucher")}
              ButtonEvent={handleClick}
              onPageChange={handlePageChange}
              permissions={permissions}
            />
  )
}
