"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetApplicantsQuery } from "@/redux/services/dashboard/hr/applicantsApi";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function Applicants() {
  const router = useRouter();
  const t = useTranslations("hr.applicants");
  const [page, setPage] = useState(1);

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useGetApplicantsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  const columns = [
    { field: "name", header: t("name") },
    { field: "email", header: t("email") },
    { field: "phone", header: t("phone") },
    { field: "expected_salary", header: t("expected_salary") },
    { field: "current_job_title", header: t("current_job_title") },
    { field: "current_salary", header: t("current_salary") },
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
    router.push("/dashboard/hr/applicants/create");
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
      emptyMessage={t("noApplicantDataFound")}
      editRoute="/dashboard/hr/applicants/edit/"
      data={data.results}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={t("addApplicant")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
