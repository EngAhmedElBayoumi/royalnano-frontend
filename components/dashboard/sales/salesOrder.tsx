"use client"; 
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useGetSalesOrderQuery } from "@/redux/services/dashboard/sales/salesOrderApi";

export default function SalesOrder() {
  const {
    isLoading,
    error,
    data: salesOrders,
  } = useGetSalesOrderQuery({});
  
  const router = useRouter();

  const transformedData = salesOrders?.results.map((order: { id: string; customer: { customer_name: string; }; order_date: string; status: string; total_amount: string; items: { custom_item_name: string; item: string; quantity: string; unit_price: string; discount: string; total: string; }[]; }) => ({
    id: order.id,
    quotation_number: order.id, 
    customer_name: order.customer.customer_name,
    date: order.order_date,
    status: order.status,
    validity_period: "N/A", 
    total_amount: order.total_amount,
    items: order.items.map((item: { custom_item_name: string; item: string; quantity: string; unit_price: string; discount: string; total: string; }) => ({
      item_name: item.custom_item_name || `Item ${item.item}`,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount: item.discount,
      total: item.total,
    })),
  })) || [];

  const columns = [
    { field: "quotation_number", header: "Order Number" },
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
    router.push("/dashboard/sales/sales-order/create");
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
          emptyMessage="no sales Orders data found"
          editRoute="/dashboard/inventory/sales-order/edit/"
          data={transformedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Sales Order"
          ButtonEvent={handleClick}
        />
      )}
    </>
  );
}