"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetInterviewsQuery } from "@/redux/services/dashboard/hr/interviewsApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

interface Interview {
  interviewers: {
    id: number;
    name: string;
  }[];
  applicant: {
    name: string;
  };
  interview_date: string;
  status: string;
}

export default function Interviews() {
  const router = useRouter();
  const t = useTranslations("hr.interviews");

  const { data, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "interview",
    useQueryHook: useGetInterviewsQuery,
  });

  // Transform data to include comma-separated interviewer names and applicant name
  const transformedData = data?.results?.map((interview: Interview) => ({
    ...interview,
    interviewers: interview.interviewers
      .map((interviewer) => interviewer.name)
      .join(", "),
    applicant: interview.applicant.name,
  })) || [];

  const columns = [
    { field: "applicant", header: t("applicant") },
    { field: "interviewers", header: t("interviewers") },
    { field: "interview_date", header: t("interview_date") },
    { field: "status", header: t("status") },
  ];

  const cardsData = [
    { title: "Scheduled", num: 45 },
    { title: "Completed", num: 87 },
    { title: "Rejected", num: 32 },
    { title: "Pending", num: 28 },
  ];

  const handleClick = () => {
    router.push("/dashboard/hr/interviews/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noInterviewDataFound")}
      editRoute="/dashboard/hr/interviews/edit"
      buttonText={t("addInterview")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
