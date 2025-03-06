"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useGetBonusesQuery } from "@/redux/services/dashboard/hr/bonusesApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const canView = permissions["bonusdeduction"].view;
  const canAdd = permissions["bonusdeduction"].add;
  const canUpdate = permissions["bonusdeduction"].change;

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
      emptyMessage={t("noBonusesDataFound")}
      editRoute={canUpdate ? "/dashboard/hr/bonuses/edit/" : undefined}
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={canAdd ? t("addBonus") : undefined}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
