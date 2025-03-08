"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useGetCompetitionsQuery } from "@/redux/services/dashboard/hr/competitionApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

interface Competition {
  department: {
    name: string;
  };
  target: number;
  reward: string;
  start_date: string;
  end_date: string;
}

const Competitions = () => {
  const router = useRouter();
  const t = useTranslations("hr.competitions");
  const [page, setPage] = useState(1);

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const canView = permissions["competition"].view;
  const canAdd = permissions["competition"].add;
  const canUpdate = permissions["competition"].change;

  const {
    data = { results: [] },
    isLoading,
    error,
    refetch,
  } = useGetCompetitionsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Transform data to include department name
  const transformedData = data.results.map((competition: Competition) => ({
    ...competition,
    department: competition.department.name,
  }));
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleClick = () => {
    router.push("/dashboard/hr/competitions/create");
  };

  return !canView ? (
    <div className="flex items-center flex-col">
      <Image
        alt="not authorized"
        src="/assets/icons/403.svg"
        width="400"
        height="400"
      />
    </div>
  ) : isLoading ? (
    <>
      <CardsSkelton />
      <TableSkelton />
    </>
  ) : error ? (
    <LoadingError />
  ) : (
    <CustomTable
      emptyMessage={t("noCompetitions")}
      editRoute={canUpdate ? "/dashboard/hr/competitions/edit/" : undefined}
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={canAdd ? t("createCompetition") : undefined}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
};

export default Competitions;
