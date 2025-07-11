"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetVacationQuery } from "@/redux/services/dashboard/hr/vacationApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

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

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "leaverequest",
      useQueryHook: useGetVacationQuery,
    });

  // Transform vacationData to only include employee name
  const transformedData =
    data?.results?.map((vacation: Vacation) => ({
      ...vacation,
      employee: vacation.employee.name,
    })) || [];

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

  const handleClick = () => {
    router.push("/dashboard/hr/vacations/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noVacationDataFound")}
      editRoute="/dashboard/hr/vacations/edit"
      buttonText={t("addVacation")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
