"use client";
import { useTableData } from '@/hooks/useTableData';
import { useGetPaymentVoucherQuery } from '@/redux/services/dashboard/finance/paymentVoucherApi';
import React from 'react'
import LoadingError from '../LoadingError';
import TableWrapper from '../tables/TableWrapper';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
export interface PaymentVoucherRow {
  id: number;
  voucher_number: string;
  account:{id:number | string, name:string};
  supplier:{id:number | string, name:string};
  payment_date: string;
  payment_method: string;
  amount_paid: string;
  purchase_invoice: { id: number | string; number: string };
  description: string;
  created_at: string;
}
export default function PaymentVoucherTab() {
   const router = useRouter();
  const t = useTranslations("finance.paymentVoucher");
  const { data, isLoading, error,handlePageChange } = useTableData({
      permissionKey: "finance",
      useQueryHook: useGetPaymentVoucherQuery,
    });
  const columns = [
    { field: "voucher_number", header: "Voucher Number" },
    { field: "account", header: "Account" },
    { field: "supplier", header: "Supplier" },
    { field: "payment_date", header: "Payment Date" },
    { field: "payment_method", header: "Payment Method" },
    { field: "amount_paid", header: "Amount Paid" },
    { field: "purchase_invoice", header: "Purchase Invoice" },
    { field: "description", header: "Description" },
    { field: "created_at", header: "Created At" },
  ];
  console.log("Payment Voucher Data:", data);
  
  const paymentVoucherData: PaymentVoucherRow[] =data?.map((item: PaymentVoucherRow, index: number) => ({
      id: index + 1,
      voucher_number: item.voucher_number,
      account: item?.account?.name,
      supplier: item.supplier?.name,
      payment_date: item.payment_date,
      payment_method: item.payment_method,
      amount_paid: item.amount_paid,
      purchase_invoice: item.purchase_invoice?.number,
      description: item.description,
      created_at: item.created_at,
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
  };
  const handleClick = () => {
    // Implement your button click logic here
    router.push("/dashboard/finance/payment-voucher/create");
  };
  return (
    <TableWrapper
          isLoading={isLoading}
          error={error}
          data={{ results:paymentVoucherData , count: data?.count || 0 }}
          columns={columns}
          cardData={cardsData}
          emptyMessage={t("noDataFound")}
          editRoute="/dashboard/finance/payment-voucher/edit"
          buttonText={t("addPaymentVoucher")}
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          permissions={permissions}
        />
  )
}
