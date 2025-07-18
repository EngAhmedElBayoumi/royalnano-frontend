"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetApplicantsQuery } from "@/redux/services/dashboard/hr/applicantsApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Applicants() {
  const router = useRouter();
  const t = useTranslations("hr.applicants");

  const { data, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "applicant",
    useQueryHook: useGetApplicantsQuery,
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

  const handleClick = () => {
    router.push("/dashboard/hr/applicants/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noApplicantDataFound")}
      editRoute="/dashboard/hr/applicants/edit"
      buttonText={t("addApplicant")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
