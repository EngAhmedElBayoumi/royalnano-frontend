"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetRequestsQuery } from "@/redux/services/dashboard/purchase/request";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useEffect, useState } from "react";

export interface PurchaseRequest {
  id: number;
  request_date: string;
  description: string;
  request_by: number;
  branch: { name: string };
  items: {
    kind: string;
    item_kind: string;
    item_name: string;
    unit: string;
    quantity: string;
    unit_price: string;
    id: number;
    total: string;
    description: string;
  }[];
}

export default function PurchaseRequest() {
  const { data: purchaseRequests, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "purchaserequest",
    useQueryHook: useGetRequestsQuery,
  });

  const { data: suppliersData } = useGetSuppliersQuery({});
  const [supplierNames, setSupplierNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (suppliersData?.results) {
      const supplierMap = suppliersData.results.reduce((acc: { [key: number]: string }, supplier: { id: number; supplier_name: string }) => {
        acc[supplier.id] = supplier.supplier_name;
        return acc;
      }, {});
      setSupplierNames(supplierMap);
    }
  }, [suppliersData]);

  const router = useRouter();
  const t = useTranslations("Purchase.Request");

  const columns = [
    { field: "id", header: t("id") },
    { field: "request_date", header: t("requestDate") },
    { field: "description", header: t("description") },
    // { field: "request_by", header: t("requestBy") },
    { field: "branch", header: t("branch") },
    { field: "items", header: t("items") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];

  const formattedData =
    purchaseRequests?.results?.map((request: PurchaseRequest) => ({
      id: request.id,
      request_date: request.request_date,
      description: request.description,
      request_by: supplierNames[request.request_by] || "Loading...", // Map request_by to supplier name
      branch: request.branch.name,
      items: request.items.map((item) => item.item_name).join(", "), // Display item names as a comma-separated string
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-request/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: purchaseRequests?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-request/edit/"
      viewRoute="/dashboard/purchase/purchase-request/view/"
      buttonText={t("addRequest")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}