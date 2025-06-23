"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Branches() {
  const router = useRouter();
  const t = useTranslations("branches.branches_data");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "branch",
      useQueryHook: useGetBranchesQuery,
    });

  const columns = [
    { field: "name", header: t("name") },
    { field: "branch_code", header: t("branchCode") },
    { field: "location", header: t("location") },
    { field: "description", header: t("description") },
    { field: "phone_number", header: t("phoneNumber") },
  ];

  const cardsData = [
    { title: "Total Branches", num: data?.count || 0 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/branches/create");
  };

  return (
    <div className="px-6">
      <TableWrapper
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        cardData={cardsData}
        emptyMessage={t("noBranchesDataFound")}
        editRoute="/dashboard/branches/edit/"
        buttonText={t("addBranch")}
        ButtonEvent={handleClick}
        onPageChange={handlePageChange}
        permissions={permissions}
      />
    </div>
  );
}
