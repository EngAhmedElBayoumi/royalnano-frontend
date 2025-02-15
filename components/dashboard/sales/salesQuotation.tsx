"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
// import { useRouter } from "next/navigation";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useGetSalesQuotationQuery } from "@/redux/services/dashboard/salesQuotationsApi";
import { useRouter } from "@/i18n/routing";

export default function SalesQuotation() {
  const {
    isLoading,
    error,
    data: salesQuotations,
  } = useGetSalesQuotationQuery({});
  if (salesQuotations?.parameters) {
    console.log(salesQuotations);
  }{
    console.log("error")
  }
  const router = useRouter();

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
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
          editRoute="/dashboard/inventory/category-models/edit/"
          data={salesQuotations}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Category model"
          ButtonEvent={handleClick}
        />
      )}
    </>
  );
}
