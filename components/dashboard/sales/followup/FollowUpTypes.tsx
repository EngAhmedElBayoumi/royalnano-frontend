"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetFollowUpTypesQuery } from "@/redux/services/dashboard/sales/followUpTypesApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

const FollowUpTypes = () => {
  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "followup",
      useQueryHook: useGetFollowUpTypesQuery,
    });

  const router = useRouter();
  const t = useTranslations("follow_up.followUpType");

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: t("followupName") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/sales/followup/types/create");
  };
  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noFollowUpTypesDataFound")}
      editRoute="/dashboard/sales/followup/types/edit/"
      buttonText={t("addFollowUpType")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
};

export default FollowUpTypes;
