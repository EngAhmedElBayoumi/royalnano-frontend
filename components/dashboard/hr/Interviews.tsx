"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useGetInterviewsQuery } from "@/redux/services/dashboard/hr/interviewsApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

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
  const [page, setPage] = useState(1);

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const canView = permissions["interview"].view;
  const canAdd = permissions["interview"].add;
  const canUpdate = permissions["interview"].change;

  const {
    data = { results: [] },
    isLoading,
    error,
    refetch
  } = useGetInterviewsQuery({
    search: "",
    ordering: "id",
    page,
    page_size: 10,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Transform data to include comma-separated interviewer names and applicant name
  const transformedData = data.results.map((interview: Interview) => ({
    ...interview,
    interviewers: interview.interviewers
      .map((interviewer) => interviewer.name)
      .join(", "),
    applicant: interview.applicant.name,
  }));

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleClick = () => {
    router.push("/dashboard/hr/interviews/create");
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
      emptyMessage={t("noInterviewDataFound")}
      editRoute={canUpdate ? "/dashboard/hr/interviews/edit/" : undefined}
      data={transformedData}
      rows={10}
      columns={columns}
      cardData={cardsData}
      buttonText={canAdd ? t("addInterview") : undefined}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      totalRecords={data.count}
    />
  );
}
