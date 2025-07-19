"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetAttendanceQuery } from "@/redux/services/dashboard/hr/attendanceApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

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

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "attendance",
      useQueryHook: useGetAttendanceQuery,
    });

  // Transform attendanceData to only include employee, branch name
  const transformedData =
    data?.results?.map((attendance: Attendance) => ({
      ...attendance,
      employee: attendance.employee.name,
      branch: attendance.branch.name,
    })) || [];

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

  const handleClick = () => {
    router.push("/dashboard/hr/attendance/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noAttendanceDataFound")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
