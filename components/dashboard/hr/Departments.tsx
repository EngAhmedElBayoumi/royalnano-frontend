"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useGetDepartmentsQuery } from "@/redux/services/dashboard/hr/departmentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function Departments() {
  const router = useRouter();
  const t = useTranslations("hr.departments");
  const [page, setPage] = useState(1);

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const canView = permissions["department"].view;
  const canAdd = permissions["department"].add;
  const canUpdate = permissions["department"].change;

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useGetDepartmentsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  const columns = [
    { field: "name", header: t("name") },
    { field: "max_leave_percentage", header: t("maxLeavePercentage") },
  ];

  const cardsData = [{ title: "Total Departments", num: data.count || 0 }];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleClick = () => {
    router.push("/dashboard/hr/departments/create");
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
      emptyMessage={t("noDepartmentsDataFound")}
      editRoute={canUpdate ? "/dashboard/hr/departments/edit/" : undefined}
      data={data.results}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={canAdd ? t("addDepartment") : undefined}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
