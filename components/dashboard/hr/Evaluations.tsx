"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useGetEvaluationsQuery } from "@/redux/services/dashboard/hr/evaluationApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

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

const Evaluations = () => {
  const router = useRouter();
  const t = useTranslations("hr.evaluations");
  const [page, setPage] = useState(1);

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const canView = permissions["evaluation"].view;
  const canAdd = permissions["evaluation"].add;
  const canUpdate = permissions["evaluation"].change;

  const {
    data = { results: [] },
    isLoading,
    error,
    refetch,
  } = useGetEvaluationsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Transform data to include interview and interviewer names
  const transformedData = data.results.map((evaluation: Evaluation) => ({
    ...evaluation,
    interview: evaluation.interview.applicant.name,
    interviewer: evaluation.interviewer.name,
  }));

  const columns = [
    { field: "interview", header: t("interview") },
    { field: "interviewer", header: t("interviewer") },
    { field: "score", header: t("score") },
    { field: "comments", header: t("comments") },
  ];

  const cardsData = [
    { title: "Total Evaluations", num: data.count || 0 },
    // Add more card data as needed
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleClick = () => {
    router.push("/dashboard/hr/evaluations/create");
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
      emptyMessage={t("noEvaluationsDataFound")}
      editRoute={canUpdate ? "/dashboard/hr/evaluations/edit/" : undefined}
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={canAdd ? t("addEvaluation") : undefined}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
};

export default Evaluations;
