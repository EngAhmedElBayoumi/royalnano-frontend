"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetRequestsQuery } from "@/redux/services/dashboard/purchase/requestApi";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useEffect, useState } from "react";

export interface PurchaseRequest {
  id: number;
  request_date: string;
  description: string;
  request_by: number;
  branch: { name: string };
  status: string;
  items: {
    kind: string;
    item_kind: string;
    item_name: string;
    unit: string;
    quantity: string;
    unit_price: string;
    total: string;
    description: string;
  }[];
}

export default function PurchaseRequest() {
  const { data: purchaseRequests, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "purchaserequest",
    useQueryHook: useGetRequestsQuery,
  });

  const { data: employeesData } = useGetEmployeesQuery({});
  const [employeeNames, setEmployeeNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (employeesData?.results) {
      const employeeMap = employeesData.results.reduce((acc: { [key: number]: string }, employee: { id: number; user?: { email: string }; name?: string }) => {
        acc[employee.id] = employee.user?.email || employee.name || `Employee ${employee.id}`;
        return acc;
      }, {});
      setEmployeeNames(employeeMap);
    }
  }, [employeesData]);

  const router = useRouter();
  const t = useTranslations("Purchase.Request");

  const columns = [
    { field: "request_date", header: t("requestDate") },
    { field: "description", header: t("description") },
    { field: "request_by_name", header: t("requestBy") },
    { field: "branch_name", header: t("branch") },
    { field: "status", header: t("status") },
    { field: "items_count", header: t("itemsCount") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: purchaseRequests?.results?.filter((r: PurchaseRequest) => r.status === 'draft').length || 0 },
    { title: t("cards.pending"), num: purchaseRequests?.results?.filter((r: PurchaseRequest) => r.status === 'pending').length || 0 },
    { title: t("cards.approved"), num: purchaseRequests?.results?.filter((r: PurchaseRequest) => r.status === 'approved').length || 0 },
    { title: t("cards.completed"), num: purchaseRequests?.results?.filter((r: PurchaseRequest) => r.status === 'completed').length || 0 },
  ];

  const formattedData =
    purchaseRequests?.results?.map((request: PurchaseRequest) => ({
      id: request.id,
      request_date: request.request_date || "-",
      description: request.description || "-",
      request_by_name: employeeNames[request.request_by] || "N/A",
      branch_name: request.branch?.name || "N/A",
      status: request.status || "draft",
      items_count: request.items?.length || 0,
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/request/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: purchaseRequests?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/request/edit"
      buttonText={t("addRequest")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}

