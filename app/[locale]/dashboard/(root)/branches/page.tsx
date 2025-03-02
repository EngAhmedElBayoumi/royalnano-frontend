"use client";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/dashboard/tables/CustomTable";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useTranslations } from "next-intl";
import TableSkelton from "@/components/dashboard/skelton/TableSkelton";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function Branches() {
  const router = useRouter();
  const t = useTranslations("branches");

  const {
    data: branchesData,
    isLoading,
    error,
  } = useGetBranchesQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const columns = [
    { field: "name", header: t("name") },
    { field: "branch_code", header: t("branchCode") },
    { field: "location", header: t("location") },
    { field: "description", header: t("description") },
    { field: "phone_number", header: t("phoneNumber") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/branches/create");
  };

  return (
    <div className="px-6 pt-7 pb-25">
      {isLoading ? (
        <>
          <CardsSkelton />
          <TableSkelton />
        </>
      ) : error ? (
        <LoadingError />
      ) : (
        <CustomTable
          cardData={cardsData}
          emptyMessage={t("noBranchesDataFound")}
          editRoute="/dashboard/branches/edit/"
          headerBG="#F8F7F7"
          headerTextColor="#C8AE50"
          headerTitle={t("branches")}
          headerIcon="/assets/icons/branches.svg"
          data={branchesData.results}
          rows={10}
          columns={columns}
          buttonText={t("addBranch")}
          ButtonEvent={handleClick}
        />
      )}
    </div>
  );
}
