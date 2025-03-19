"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetOrdersQuery } from "@/redux/services/dashboard/purchase/orderApi";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useEffect, useState } from "react";

export interface PurchaseOrder {
  id: number;
  order_date: string;
  offer_expiry: string;
  prefix: string;
  delivery_date: string;
  due_date: string;
  branch: {name:string};
  supplier: number;
  description: string;
  items: {
    kind: string;
    name: string;
    unit: string;
    quantity: string;
    unit_price: string;
    id: number;
    bonus: string;
    amount: string;
    discount: string;
    discount_percent: string;
    vat_kd: string;
    total: string;
  }[];
  invoice_detail: {
    discount: string;
    vat: string;
    subtotal: string;
    quantity: string;
    free_quantity: string;
    total: string;
  };
}

export default function PurchaseOrder() {
  const { data: purchaseOrders, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "purchaseorder",
    useQueryHook: useGetOrdersQuery,
  });
  const {
    data: suppliersData,
  
  } = useGetSuppliersQuery({});
    const [supplierNames, setSupplierNames] = useState<{ [key: number]: string }>({}); 
  
   useEffect(() => {
      if (suppliersData?.results) {
        const supplierMap = suppliersData.results.reduce((acc, supplier) => {
          acc[supplier.id] = supplier.supplier_name;
          return acc;
        }, {} as { [key: number]: string });
        setSupplierNames(supplierMap);
      }
    }, [suppliersData]);
  const router = useRouter();
  const t = useTranslations("Purchase.Order");

  const columns = [
    { field: "id", header: t("id") },
    { field: "order_date", header: t("orderDate") },
    { field: "offer_expiry", header: t("offerExpiry") },
    { field: "prefix", header: t("prefix") },
    { field: "delivery_date", header: t("deliveryDate") },
    { field: "due_date", header: t("dueDate") },
    { field: "branch", header: t("branch") },
    { field: "supplier", header: t("supplier") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];

  const formattedData =
    purchaseOrders?.results?.map((order: PurchaseOrder) => ({
      id: order.id,
      order_date: order.order_date,
      offer_expiry: order.offer_expiry,
      prefix: order.prefix,
      delivery_date: order.delivery_date,
      due_date: order.due_date,
      branch: order.branch.name,
      supplier: supplierNames[order.supplier] || "Loading...", 

      description: order.description,
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-order/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: purchaseOrders?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-order/edit/"
      viewRoute="/dashboard/purchase/purchase-order/view/"
      buttonText={t("addOrder")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}