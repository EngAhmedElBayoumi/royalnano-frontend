"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetCompetitionsQuery } from "@/redux/services/dashboard/hr/competitionApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

interface Competition {
  department: {
    name: string;
  };
  target: number;
  reward: string;
  start_date: string;
  end_date: string;
}

export default function Competitions() {
  const router = useRouter();
  const t = useTranslations("hr.competitions");

  const { data, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "competition",
    useQueryHook: useGetCompetitionsQuery,
  });

  // Transform data to include department name
  const transformedData = data?.results?.map((competition: Competition) => ({
    ...competition,
    department: competition.department.name,
  })) || [];

  const columns = [
    { field: "department", header: t("department") },
    { field: "target", header: t("target") },
    { field: "reward", header: t("reward") },
    { field: "start_date", header: t("startDate") },
    { field: "end_date", header: t("endDate") },
  ];

  const cardsData = [
    { title: "Active", num: 45 },
    { title: "Completed", num: 87 },
    { title: "Upcoming", num: 32 },
  ];

  const handleClick = () => {
    router.push("/dashboard/hr/competitions/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noCompetitions")}
      editRoute="/dashboard/hr/competitions/edit"
      buttonText={t("createCompetition")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
