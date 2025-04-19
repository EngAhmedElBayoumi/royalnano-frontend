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

interface SalesQuotationProps {
  customerId?: number; // Optional prop for customer-specific quotations
}

export default function SalesQuotation({ customerId }: SalesQuotationProps) {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const router = useRouter();

  // Call both hooks unconditionally
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
    customer_id: customerId || 0, // Pass 0 if customerId is undefined
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  // Determine which data to use
  const isLoading = customerId ? isLoadingCustomer : isLoadingAll;
  const error = customerId ? errorCustomer : errorAll;
  const salesQuotations = customerId
    ? customerSalesQuotations
    : allSalesQuotations?.results || [];

  const columns = [
    { field: "quotation_number", header: "Quotation Number" },
    { field: "customer_name", header: "Customer Name" },
    { field: "date", header: "Date" },
    { field: "status", header: "Status" },
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
          editRoute={
            "/dashboard/sales/sales-quotation/edit?customerId=" + customerId
          }
          data={salesQuotations}
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
