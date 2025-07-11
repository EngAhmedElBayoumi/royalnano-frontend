"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

interface Employee {
  name: string;
  branch: {
    name: string;
  };
  leader?: {
    name: string;
  };
  email_address: string;
  phone: string;
  address: string;
}

export default function Employees() {
  const router = useRouter();
  const t = useTranslations("hr.employees");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "employee",
      useQueryHook: useGetEmployeesQuery,
    });

  // Transform employeesData to only include branch name
  const transformedData =
    data?.results?.map((employee: Employee) => ({
      ...employee,
      branch: employee.branch.name,
      leader: employee.leader?.name || "-",
    })) || [];

  const columns = [
    { field: "name", header: t("name") },
    { field: "email_address", header: t("emailAddress") },
    { field: "phone", header: t("phone") },
    { field: "address", header: t("address") },
    { field: "branch", header: t("branch") },
    { field: "leader", header: t("leader") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/hr/employees/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noEmployeesDataFound")}
      editRoute="/dashboard/hr/employees/edit"
      buttonText={t("addEmployee")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
