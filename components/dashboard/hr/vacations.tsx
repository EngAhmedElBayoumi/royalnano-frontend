"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useGetVacationQuery } from "@/redux/services/dashboard/hr/vacationApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

interface Vacation {
  employee: {
    name: string;
  };
  start_date: Date;
  end_date: Date;
  reason: string;
  status: "pending" | "approved" | "rejected";
}
export default function Vacations() {
  const router = useRouter();
  const t = useTranslations("hr.vacation");
  const [page, setPage] = useState(1);

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const canView = permissions["leaverequest"].view;

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useGetVacationQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  // Transform vacationData to only include employee, branch name
  const transformedData = data.results.map((vacation: Vacation) => ({
    ...vacation,
    employee: vacation.employee.name,
  }));

  const columns = [
    { field: "employee", header: t("employee") },
    { field: "start_date", header: t("start_date") },
    { field: "end_date", header: t("end_date") },
    { field: "reason", header: t("reason") },
    { field: "status", header: t("status") },
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
    router.push("/dashboard/hr/vacations/create");
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
      emptyMessage={t("noVacationDataFound")}
      editRoute="/dashboard/hr/vacations/edit/"
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
