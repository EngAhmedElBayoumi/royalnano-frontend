"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetBranchesTransactionsQuery } from "@/redux/services/dashboard/inventory/branchTransactionsApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function BranchTransactions() {
  const router = useRouter();
  const t = useTranslations("branches.branches_transactions");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "branch",
      useQueryHook: useGetBranchesTransactionsQuery,
    });

  const columns = [
    { field: "transaction_type", header: t("transaction_type") },
    { field: "amount", header: t("amount") },
    { field: "description", header: t("description") },
    { field: "branch", header: t("branch") },
    { field: "reset_image", header: t("reset_image") },
  ];

    const transformedData = data?.results?.map(
    (branchTransaction: { branch: { name: string } }) => ({
      ...branchTransaction,
      branch: branchTransaction?.branch?.name,
    })
  );

  const cardsData = [
    { title: "Total Branches", num: data?.count || 0 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/branches/transactions/create");
  };

  return (
    <div className="px-6">
      <TableWrapper
        isLoading={isLoading}
        error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
        columns={columns}
        cardData={cardsData}
        emptyMessage={t("no_branches_transaction_data_found")}
        editRoute="/dashboard/branches/transactions/edit"
        buttonText={t("add_branch_transaction")}
        ButtonEvent={handleClick}
        onPageChange={handlePageChange}
        permissions={permissions}
      />
    </div>
  );
}
