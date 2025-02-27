"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetBonusesQuery } from "@/redux/services/dashboard/hr/bonusesApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

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
  const [page, setPage] = useState(1);

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useGetBonusesQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  // Transform bonusesData to only include employee name
  const transformedData = data.results.map((bonus: Bonus) => ({
    ...bonus,
    employee: bonus.employee.name,
  }));

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
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleClick = () => {
    router.push("/dashboard/hr/bonuses/create");
  };

  return isLoading ? (
    <>
      <CardsSkelton />
      <TableSkelton />
    </>
  ) : error ? (
    <LoadingError />
  ) : (
    <CustomTable
      emptyMessage={t("noBonusesDataFound")}
      editRoute="/dashboard/hr/bonuses/edit/"
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addBonus")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
