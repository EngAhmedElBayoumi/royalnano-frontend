"use client";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "../skelton/TableSkelton";
import CardsSkelton from "../skelton/CardsSkelton";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useGetSalesOrderQuery } from "@/redux/services/dashboard/sales/salesOrderApi";
import { useState } from "react";
// import { useTranslations } from "next-intl";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";

export default function SalesOrder() {
  const [page, setPage] = useState(1);
  // const t = useTranslations("Sales.SalesOrder");

  const {
    isLoading,
    error,
    data: salesOrders,
  } = useGetSalesOrderQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });
  console.log(salesOrders);
  const router = useRouter();
  const {
    data: itemsData,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 1000,
  });

  const existingItems = itemsData?.results || [];

  const getItemNameById = (itemId: string) => {
    const item = existingItems.find(
      (existingItem) => existingItem.id === parseInt(itemId)
    );
    return item ? item.item_name : `Item ${itemId}`;
  };

  const transformedData =
    salesOrders?.results.map(
      (order: {
        description: any;
        branch: any;
        id: string;
        customer: { customer_name: string };
        order_date: string;
        status: string;
        total_amount: string;
        items: {
          custom_item_name: string;
          item: string;
          quantity: string;
          unit_price: string;
          discount: string;
          total: string;
        }[];
      }) => ({
        id: order.id,
        quotation_number: order.id,
        customer_name: order.customer.customer_name,
        description: order.description,
        date: order.order_date,
        status: order.status,
        validity_period: "N/A",
        branch: order.branch.name,
        total_amount: order.total_amount,
        items: order.items.map(
          (item: {
            custom_item_name: string;
            item: string;
            quantity: string;
            unit_price: string;
            discount: string;
            total: string;
          }) => ({
            item_name: item.custom_item_name || getItemNameById(item.item), // Use the helper function here
            quantity: item.quantity,
            unit_price: item.unit_price,
            discount: item.discount,
            total: item.total,
          })
        ),
      })
    ) || [];
  // console.log(salesOrders?.results)
  const columns = [
    { field: "quotation_number", header: "Order Number" },
    { field: "description", header: "Description" },
    { field: "customer_name", header: "Customer Name" },
    { field: "date", header: "Date" },
    { field: "status", header: "Status" },
    // { field: "validity_period", header: "Validity Period" },
    { field: "branch", header: "Branch" },
    { field: "items", header: "Items" },
    { field: "total_amount", header: "Total Amount" },
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
          editRoute="/dashboard/sales/sales-order/edit/"
          data={transformedData}
          rows={10}
          columns={columns}
          cardData={cardsData}
          buttonText="Add Sales Order"
          ButtonEvent={handleClick}
          onPageChange={handlePageChange}
          totalRecords={salesOrders?.count || 0}
        />
      )}
    </>
  );
}
