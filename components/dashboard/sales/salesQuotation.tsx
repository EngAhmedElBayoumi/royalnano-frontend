/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import {
  useGetSalesQuotationQuery,
  useGetCustomerQuotationsQuery,
} from "@/redux/services/dashboard/sales/salesQuotationsApi";
import { useState } from "react";
import { UpdateQuotationStatusForm } from "../forms/sales/UpdateQuotationStatusForm";

interface SalesQuotationProps {
  customerId?: number;
}

export default function SalesQuotation({ customerId }: SalesQuotationProps) {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const router = useRouter();

  const {
    isLoading: isLoadingAll,
    error: errorAll,
    data: allSalesQuotations,
  } = useGetSalesQuotationQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  const {
    isLoading: isLoadingCustomer,
    error: errorCustomer,
    data: customerSalesQuotations,
  } = useGetCustomerQuotationsQuery({
    customer_id: customerId || 0,
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  const isLoading = customerId ? isLoadingCustomer : isLoadingAll;
  const error = customerId ? errorCustomer : errorAll;
  const salesQuotations = { results: [], count: 0 };
  salesQuotations.results = customerId
    ? customerSalesQuotations
    : allSalesQuotations?.results;
  salesQuotations.count = customerId
    ? customerSalesQuotations?.length || 0
    : allSalesQuotations?.count || 0;

  const columns = [
    { field: "customer_name", header: "Customer Name" },
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
    <>
      {isLoading ? (
        <>
          <CardsSkelton />
          <TableSkelton />
        </>
      ) : error ? (
        <div className="flex justify-center flex-col items-center pb-10">
          <Image
            src="/assets/icons/dashboard/loading-error.svg"
            alt="loading error"
            width="400"
            height="300"
          />
          Error loading data
        </div>
      ) : (
        <CustomTable
          emptyMessage="No sales quotations data found"
          viewRoute={"/dashboard/sales/sales-quotation/view"}
          data={salesQuotations?.results}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Sales Quotation"
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          totalRecords={salesQuotations?.count || 0}
        />
      )}
    </>
  );
}
