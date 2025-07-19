"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { listItems } from "@/lib/utils/types";
import {
  useGetBranchByIdQuery,
  useGetBranchesQuery,
} from "@/redux/services/dashboard/inventory/branchesApi";

export interface Supplier {
  id: number;
  title: string;
  full_name: string;
  supplier_name: string;
  phone_number: string;
  suffix?: string;
  street_address: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  additional_info?: string;
  taxes_business_id: string;
  expenses_rates_billing_rate: number;
  payment_terms: string;
  account_no: string;
  opening_balance: number;
  as_of: string;
  branch?: listItems | null;
  accounting_expenses_category?: listItems | null;
}

export default function PurchaseSupplier() {
  const {
    data: suppliers,
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "supplier",
    useQueryHook: useGetSuppliersQuery,
  });

  const router = useRouter();
  const t = useTranslations("purchase.Supplier");

  const columns = [
    { field: "supplier_name", header: t("supplierName") },
    { field: "full_name", header: t("fullName") },
    { field: "phone_number", header: t("phoneNumber") },
    { field: "city", header: t("city") },
    { field: "country", header: t("country") },
    { field: "expenses_rates_billing_rate", header: t("billingRate") },
    { field: "branch_name", header: t("branch") },
  ];

  const cardsData = [
    { title: t("cards.totalSuppliers"), num: suppliers?.count || 0 },
    { title: t("cards.activeSuppliers"), num: suppliers?.results?.length || 0 },
    { title: t("cards.newThisMonth"), num: 12 },
    { title: t("cards.pendingApproval"), num: 3 },
  ];
  const { data: allBranches } = useGetBranchesQuery({});
  const formattedData =
    suppliers?.results?.map((supplier: Supplier) => {
      const branchName =
        allBranches?.results?.find((branch) => branch.id === supplier.branch)
          ?.name || "N/A";

      return {
        id: supplier.id,
        supplier_name: supplier.supplier_name,
        full_name: supplier.full_name,
        phone_number: supplier.phone_number,
        city: supplier.city,
        country: supplier.country,
        expenses_rates_billing_rate: supplier.expenses_rates_billing_rate,
        branch_name: branchName,
      };
    }) || [];

  console.log(formattedData);
  const handleClick = () => {
    router.push("/dashboard/purchase/supplier/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: suppliers?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/supplier/edit"
      buttonText={t("addSupplier")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
