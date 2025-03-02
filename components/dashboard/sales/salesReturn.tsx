"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useGetSalesInvoiceQuery } from "@/redux/services/dashboard/sales/salesInvoiceApi";
import { useState } from "react";

export default function SalesReturn() {
  const [page, setPage] = useState(1);
 
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const {
    isLoading,
    error,

    data: salesInvoices,
  } = useGetSalesInvoiceQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });
 
  const router = useRouter();
console.log(salesInvoices)
const transformedData = salesInvoices?.results.map((invoice: { id: string; customer: { customer_name: string; }; due_date: string; status: string; total_amount: string; items: { custom_item_name: string; item: string; quantity: string; unit_price: string; discount: string; total: string; }[]; }) => ({
  id: invoice.id,
  quotation_number: invoice.id, 
  customer_name: invoice.customer.customer_name,
  date: invoice.due_date,
  status: invoice.status,
  validity_period: "N/A", 
  total_amount: invoice.total_amount,
  items: invoice.items.map((item: { custom_item_name: string; item: string; quantity: string; unit_price: string; discount: string; total: string; }) => ({
    item_name: item.custom_item_name || `Item ${item.item}`,
    quantity: item.quantity,
    unit_price: item.unit_price,
    discount: item.discount,
    total: item.total,
  })),
})) || "N/A";
  const columns = [
    { field: "quotation_number", header: "Invoice Number" },
    
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
    router.push("/dashboard/sales/sales-invoices/create");
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
  emptyMessage="no sales Invoices data found"
  editRoute="/dashboard/inventory/sales-invoice/edit/"
  data={transformedData} 
  rows={10}
  columns={columns}
  cardData={cardsData}
  buttonText="Add Sales Invoice"
  ButtonEvent={handleClick}
  onPageChange={handlePageChange}
  totalRecords={salesInvoices?.count || 0} 
/>
      )}
    </>
  );
}
