"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
// import { useRouter } from "next/navigation";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useGetSalesQuotationQuery } from "@/redux/services/dashboard/sales/salesQuotationsApi";
import { useState } from "react";

export default function SalesQuotation() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const {
    isLoading,
    error,
    data: salesQuotations,
  } = useGetSalesQuotationQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });
  console.log("quotationss", salesQuotations);
  const router = useRouter();

  const columns = [
    { field: "quotation_number", header: "Quotation Number" },

    { field: "customer_name", header: "Customer Name" },
    { field: "date", header: "Date" },
    { field: "status", header: "Status" },
    { field: "validity_period", header: "Validity Period" },
    { field: "total_amount", header: "Total Amount" },

    { field: "items", header: "Items" },
    //     items
    // :
    // Array(1)
    // 0
    // :
    // discount
    // :
    // "1.00"
    // discount_percent
    // :
    // "1.00"
    // item_name
    // :
    // "1"
    // quantity
    // :
    // 1
    // tax_rate
    // :
    // "1.00"
    // total
    // :
    // "0.00"
    // unit_price
    // :
    // "1.00"
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/sales/sales-quotation/create");
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
          emptyMessage="no sales Quotations data found"
          editRoute="/dashboard/sales/sales-quotation/edit/"
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
