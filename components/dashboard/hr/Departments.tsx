"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetDepartmentsQuery } from "@/redux/services/dashboard/hr/departmentApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Departments() {
  const router = useRouter();
  const t = useTranslations("hr.departments");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "department",
      useQueryHook: useGetDepartmentsQuery,
    });

  const columns = [
    { field: "name", header: t("name") },
    { field: "max_leave_percentage", header: t("maxLeavePercentage") },
  ];

  const cardsData = [{ title: "Total Departments", num: data.count || 0 }];

  const handleClick = () => {
    router.push("/dashboard/hr/departments/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDepartmentsDataFound")}
      editRoute="/dashboard/hr/departments/edit/"
      buttonText={t("addDepartment")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
