"use client";
import { useRouter } from "@/i18n/routing";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetSalesInvoiceQuery } from "@/redux/services/dashboard/sales/salesInvoiceApi";

export default function SalesInvoice() {
  const router = useRouter();
  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "salesinvoice",
      useQueryHook: useGetSalesInvoiceQuery,
    });

  const transformedData = data?.results?.map(
    (invoice: {
      id: string;
      customer: { customer_name: string };
      due_date: string;
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
      id: invoice.id,
      quotation_number: invoice.id,
      customer_name: invoice.customer.customer_name,
      date: invoice.due_date,
      status: invoice.status,
      validity_period: "N/A",
      total_amount: invoice.total_amount,
      items: invoice.items.map(
        (item: {
          custom_item_name: string;
          item: string;
          quantity: string;
          unit_price: string;
          discount: string;
          total: string;
        }) => ({
          item_name: item.custom_item_name || `Item ${item.item}`,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount: item.discount,
          total: item.total,
        })
      ),
    })
  );

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
    router.push("/dashboard/sales/sales-invoice/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      emptyMessage="no sales Invoices data found"
      editRoute="/dashboard/sales/sales-invoice/edit"
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      buttonText="Add Sales Invoice"
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
