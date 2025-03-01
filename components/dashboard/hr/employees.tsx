"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

// Define the type for employee
interface Employee {
  name: string;
  branch: {
    name: string;
  };
  email_address: string;
  phone: string;
  address: string;
}
export default function Employees() {
  const router = useRouter();
  const t = useTranslations("hr.employees");
  const [page, setPage] = useState(1);

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useGetEmployeesQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  // Transform employeesData to only include branch name
  const transformedData = data.results.map((employee: Employee) => ({
    ...employee,
    branch: employee.branch.name,
  }));

  const columns = [
    { field: "name", header: t("name") },
    { field: "email_address", header: t("emailAddress") },
    { field: "phone", header: t("phone") },
    { field: "address", header: t("address") },
    { field: "branch", header: t("branch") },
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
    router.push("/dashboard/hr/employees/create");
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
      emptyMessage={t("noEmployeesDataFound")}
      editRoute="/dashboard/hr/employees/edit/"
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addEmployee")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
