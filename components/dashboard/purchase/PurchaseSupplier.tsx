"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";

export interface Supplier {
  id: number;
  title: string;
  full_name: string;
  supplier_name: string;
  phone_number: string;
  suffix: string;
  street_address: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  additional_info: string;
  taxes_business_id: string;
  expenses_rates_billing_rate: string;
  payment_terms: string;
  account_no: string;
  opening_balance: string;
  as_of: string;
  branch: null | { name: string };
  accounting_expenses_category: null | { name: string };
}

export default function PurchaseSupplier() {
  const { data: suppliers, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "supplier",
    useQueryHook: useGetSuppliersQuery,
  });

  const router = useRouter();
  const t = useTranslations("Purchase.Supplier");

  const columns = [
    { field: "id", header: t("id") },
    { field: "supplier_name", header: t("supplierName") },
    { field: "full_name", header: t("fullName") },
    { field: "phone_number", header: t("phoneNumber") },
    { field: "city", header: t("city") },
    { field: "country", header: t("country") },
    { field: "expenses_rates_billing_rate", header: t("billingRate") },
  ];

  const cardsData = [
    { title: t("cards.newRequests"), num: 145 },
    { title: t("cards.complete"), num: 87 },
    { title: t("cards.pending"), num: 3200 },
    { title: t("cards.failed"), num: 48 },
    { title: t("cards.paid"), num: 48 },
  ];

  const formattedData =
    suppliers?.results?.map((supplier: Supplier) => ({
      id: supplier.id,
      supplier_name: supplier.supplier_name,
      full_name: supplier.full_name,
      phone_number: supplier.phone_number,
      city: supplier.city,
      country: supplier.country,
      expenses_rates_billing_rate: supplier.expenses_rates_billing_rate,
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/purchase-supplier/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: suppliers?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/purchase-supplier/edit/"
      buttonText={t("addSupplier")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}