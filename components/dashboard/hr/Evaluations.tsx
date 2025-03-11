"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetEvaluationsQuery } from "@/redux/services/dashboard/hr/evaluationApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

interface Evaluation {
  score: number;
  comments?: string;
  interview: {
    applicant: { name: string };
  };
  interviewer: {
    name: string;
  };
}

export default function Evaluations() {
  const router = useRouter();
  const t = useTranslations("hr.evaluations");

  const { data, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "evaluation",
    useQueryHook: useGetEvaluationsQuery,
  });

  // Transform data to include interview and interviewer names
  const transformedData = data?.results?.map((evaluation: Evaluation) => ({
    ...evaluation,
    interview: evaluation.interview.applicant.name,
    interviewer: evaluation.interviewer.name,
  })) || [];

  const columns = [
    { field: "interview", header: t("interview") },
    { field: "interviewer", header: t("interviewer") },
    { field: "score", header: t("score") },
    { field: "comments", header: t("comments") },
  ];

  const cardsData = [
    { title: "Total Evaluations", num: data?.count || 0 },
  ];

  const handleClick = () => {
    router.push("/dashboard/hr/evaluations/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noEvaluationsDataFound")}
      editRoute="/dashboard/hr/evaluations/edit/"
      buttonText={t("addEvaluation")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
