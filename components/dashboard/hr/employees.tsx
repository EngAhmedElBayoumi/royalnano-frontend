"use client";
import { useRouter } from "next/navigation";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useTranslations } from "next-intl";

export default function Employees() {
  const router = useRouter();
  const t = useTranslations("hr.employees");

  const { data, isLoading, error } = useGetEmployeesQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const columns = [
    { field: "name", header: t("name") },
    { field: "email_address", header: t("emailAddress") },
    { field: "phone", header: t("phone") },
    { field: "job_title", header: t("jobTitle") },
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
      data={data.results}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addEmployees")}
      ButtonEvent={handleClick}
    />
  );
}
