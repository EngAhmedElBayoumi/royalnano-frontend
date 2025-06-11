"use client";
import FinanceCard from "@/components/dashboard/finance/finance-card";
import LoadingError from "@/components/dashboard/LoadingError";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { DataInTable } from "@/components/dashboard/tables/types";
import { useTableData } from "@/hooks/useTableData";
import { useGetFinanceQuery } from "@/redux/services/dashboard/finance/financeApi";
import React from "react";
export interface financeRow {
  id: number;
  name: string;
  code: string;
  account_type: string;
  parent: string;
  children?: financeRow[];
}
export default function FinancesPage() {
  const { data, isLoading, error } = useTableData({
    permissionKey: "finance",
    useQueryHook: useGetFinanceQuery,
  });

  const columns = [
    { field: "name", header: "Name" },
    { field: "code", header: "Code" },
    { field: "account_type", header: "Account Type" },
    { field: "parent", header: "Parent" },
    { field: "children", header: "Children" },
  ];

  const yourCustomerData: DataInTable[] =
    data?.map((item: financeRow, index: number) => ({
      id: index + 1,
      name: item.name,
      code: item.code,
      account_type: item.account_type,
      parent: item.parent || "N/A",
      children: item.children
        ? item.children.map((child: financeRow) => child.name).join(", ")
        : "N/A",
    })) || [];

  const cardsData = [
    { title: "Customers", num: 145 },
    { title: "Orders", num: 87 },
    { title: "Revenue", num: 3200 },
    { title: "Products", num: 48 },
    { title: "Products", num: 48 },
    { title: "Products", num: 48 },
  ];

  if (error) {
    return <LoadingError />;
  }

  return (
    <>
      {isLoading ? (
        <>
          <CardsSkelton />
          <TableSkelton />
        </>
      ) : (
        <div className="px-6 pt-7 pb-25  ">
          <FinanceCard finance={data} />
          <CustomTable
            emptyMessage="you have no finance"
            secondHeaderBG="transparent"
            secondHeaderIcon="/assets/icons/importCustomerList.svg"
            secondHeaderTextColor="#C8AE50"
            headerBG="#F8F7F7"
            headerTextColor="#C8AE50"
            headerIcon="/assets/icons/client.svg"
            data={yourCustomerData}
            rows={10}
            columns={columns}
            cardData={cardsData}
            ButtonEvent={() => console.log("Button Clicked")}
          />
        </div>
      )}
    </>
  );
}
