"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetAllReviewsQuery } from "@/redux/services/website/customerReviewApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function CustomerReviews() {
  const router = useRouter();
  const t = useTranslations("dashboard_website.CustomerReviews");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "customerreview",
      useQueryHook: useGetAllReviewsQuery,
    });

  const columns = [
    { field: "name", header: t("name") },
    { field: "review", header: t("review") },
    { field: "rating", header: t("rating") },
    { field: "image", header: t("image") },
  ];

  const cardsData = [{ title: "totalReviews", num: data?.count || 0 }];

  const handleClick = () => {
    router.push("/dashboard/website/customer-reviews/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noCustomerReviewsFound")}
      editRoute="/dashboard/website/customer-reviews/edit"
      buttonText={t("addCustomerReview")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
