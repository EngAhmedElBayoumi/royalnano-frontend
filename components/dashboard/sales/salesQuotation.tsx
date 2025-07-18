/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "@/i18n/routing";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetSalesQuotationQuery } from "@/redux/services/dashboard/sales/salesQuotationsApi";
import { useMemo } from "react";
import { UpdateQuotationStatusForm } from "../forms/sales/UpdateQuotationStatusForm";

interface SalesQuotationProps {
  customerId?: number;
}

export default function SalesQuotation({ customerId }: SalesQuotationProps) {
  const router = useRouter();
  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "quotation",
      useQueryHook: useGetSalesQuotationQuery,
    });

  // Filter or map data for customerId if provided
  const filteredResults = useMemo(() => {
    if (!data?.results) return [];
    if (!customerId) return data.results;
    return data.results.filter((q: any) => q.customer === customerId);
  }, [data, customerId]);

  const count = customerId ? filteredResults.length : data?.count || 0;

  const columns = [
    { field: "customer_name", header: "Customer Name" },
    { field: "quotation_number", header: "Quotation Number" },
    { field: "date", header: "Date" },
    {
      field: "status",
      header: "Status",
      render: (row: any) =>
        row.id ? (
          <UpdateQuotationStatusForm key={row.id} quotationId={row.id} />
        ) : (
          <span>Loading...</span>
        ),
    },
    { field: "validity_period", header: "Validity Period" },
    { field: "total_amount", header: "Total Amount" },
    { field: "items", header: "Items" },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push(
      "/dashboard/sales/sales-quotation/create?customerId=" + customerId
    );
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      emptyMessage="No sales quotations data found"
      viewRoute={"/dashboard/sales/sales-quotation/view"}
      data={{ results: filteredResults, count }}
      columns={columns}
      cardData={cardsData}
      buttonText="Add Sales Quotation"
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
