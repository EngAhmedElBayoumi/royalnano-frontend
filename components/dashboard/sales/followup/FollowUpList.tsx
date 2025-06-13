"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetFollowUpTypesQuery } from "@/redux/services/dashboard/sales/followUpTypesApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

const FollowUpList = () => {
  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "followup",
      useQueryHook: useGetFollowUpTypesQuery,
    });

  const router = useRouter();
  const t = useTranslations("follow_up");

  const columns = [
    { field: "customer", header: t("customer") },
    { field: "follow_up_type", header: t("follow_up_type") },
    { field: "action_date", header: t("action_date") },
    { field: "comment", header: t("comment") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/sales/followup/create");
  };
  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noFollowUpTypesDataFound")}
      editRoute="/dashboard/sales/followup/edit"
      buttonText={t("add_follow_up")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
};

export default FollowUpList;
