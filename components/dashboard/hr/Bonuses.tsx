"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetBonusesQuery } from "@/redux/services/dashboard/hr/bonusesApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

interface Bonus {
  employee: {
    name: string;
  };
  amount: number;
  reason: string;
  type: string;
  date: string;
}

export default function Bonuses() {
  const router = useRouter();
  const t = useTranslations("hr.bonuses");

  const { data, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "bonusdeduction",
    useQueryHook: useGetBonusesQuery,
  });

  // Transform bonusesData to only include employee name
  const transformedData = data?.results?.map((bonus: Bonus) => ({
    ...bonus,
    employee: bonus.employee.name,
  })) || [];

  const columns = [
    { field: "employee", header: t("employee") },
    { field: "amount", header: t("amount") },
    { field: "reason", header: t("reason") },
    { field: "type", header: t("type") },
    { field: "date", header: t("date") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/hr/bonuses/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noBonusesDataFound")}
      editRoute="/dashboard/hr/bonuses/edit/"
      buttonText={t("addBonus")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
