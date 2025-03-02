"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetAttendanceQuery } from "@/redux/services/dashboard/hr/attendanceApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

interface Attendance {
  employee: {
    name: string;
  };
  branch: {
    name: string;
  };
  date: string;
  check_in: string;
  check_out: string;
}

export default function Attendance() {
  const router = useRouter();
  const t = useTranslations("hr.attendance");
  const [page, setPage] = useState(1);

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useGetAttendanceQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  // Transform attendanceData to only include employee, branch name
  const transformedData = data.results.map((attendance: Attendance) => ({
    ...attendance,
    employee: attendance.employee.name,
    branch: attendance.branch.name,
  }));
  const columns = [
    { field: "employee", header: t("employee") },
    { field: "branch", header: t("branch") },
    { field: "date", header: t("date") },
    { field: "check_in", header: t("attendance") },
    { field: "check_out", header: t("departure") },
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
    router.push("/dashboard/hr/attendance/create");
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
      emptyMessage={t("noAttendanceDataFound")}
      editRoute="/dashboard/hr/attendance/edit/"
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addAttendance")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
