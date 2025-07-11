"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetJobsQuery } from "@/redux/services/dashboard/hr/jobsApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

interface Job {
  id: number;
  name: string;
  created_at: string;
  permissions: {
    id: number;
    name: string;
    codename: string;
  }[];
}

export default function Jobs() {
  const router = useRouter();
  const t = useTranslations("hr.jobs");

  const { data, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "permission",
    useQueryHook: useGetJobsQuery,
  });

  // Transform permissions array to string for display
  const transformedData = data?.results?.map((job: Job) => ({
    id: job.id,
    name: job.name,
    created_at: job.created_at,
    permissions: job.permissions.map(p => p.name).join(", "),
  })) || [];

  const columns = [
    { field: "name", header: t("name") },
    { field: "created_at", header: t("createdAt") },
    { field: "permissions", header: t("permissions") },
  ];

  const cardsData = [
    { title: t("totalJobs"), num: data?.count || 0 },
  ];

  const handleClick = () => {
    router.push("/dashboard/hr/jobs/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: data?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noJobsDataFound")}
      editRoute="/dashboard/hr/jobs/edit"
      buttonText={t("addJob")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}