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
  branch?: { id: number; name: string } | null;
  supplier?: { id: number; supplier_name: string } | number | null;
  description?: string;
  status?: string;
  items?: {
    kind: string;
    name: string;
    unit: string;
    quantity: string;
    unit_price: string;
    bonus?: string;
    amount?: string;
    discount?: string;
    discount_percent?: string;
    vat_kd?: string;
    total?: string;
  }[];
  invoice_detail?: {
    discount?: string;
    vat?: string;
    subtotal?: string;
    quantity?: string;
    free_quantity?: string;
    total?: string;
  };
}

export default function PurchaseOrder() {
  const {
    data: purchaseOrders,
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "purchaseorder",
    useQueryHook: useGetOrdersQuery,
  });
  const { data: suppliersData } = useGetSuppliersQuery({});
  const [supplierNames, setSupplierNames] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    if (suppliersData?.results) {
      const supplierMap = suppliersData.results.reduce(
        (
          acc: { [x: string]: string },
          supplier: { id: string | number; supplier_name: string }
        ) => {
          acc[supplier.id] = supplier.supplier_name;
          return acc;
        },
        {} as { [key: number]: string }
      );
      setSupplierNames(supplierMap);
    }
  }, [suppliersData]);

  const router = useRouter();
  const t = useTranslations("purchase.Order");

  const columns = [
    { field: "prefix", header: t("prefix") },
    { field: "order_date", header: t("orderDate") },
    { field: "delivery_date", header: t("deliveryDate") },
    { field: "due_date", header: t("dueDate") },
    { field: "branch_name", header: t("branch") },
    { field: "supplier_name", header: t("supplier") },
    { field: "status", header: t("status") },
  ];

  const cardsData = [
    { title: t("cards.totalOrders"), num: purchaseOrders?.count || 0 },
    {
      title: t("cards.pendingOrders"),
      num:
        purchaseOrders?.results?.filter(
          (order: PurchaseOrder) => order.status === "pending"
        ).length || 0,
    },
    {
      title: t("cards.completedOrders"),
      num:
        purchaseOrders?.results?.filter(
          (order: PurchaseOrder) => order.status === "completed"
        ).length || 0,
    },
    { title: t("cards.thisMonth"), num: 12 },
  ];

  const formattedData =
    purchaseOrders?.results?.map((order: PurchaseOrder) => ({
      id: order.id,
      prefix: order.prefix,
      order_date: order.order_date,
      delivery_date: order.delivery_date,
      due_date: order.due_date,
      branch_name: order.branch?.name || "N/A",
      supplier_name:
        typeof order.supplier === "object"
          ? order.supplier?.supplier_name
          : supplierNames[order.supplier as number] || "N/A",
      status: order.status || "pending",
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/order/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: purchaseOrders?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/order/edit"
      viewRoute="/dashboard/purchase/order/view"
      buttonText={t("addOrder")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
