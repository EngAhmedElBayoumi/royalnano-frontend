"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetSocialQuery } from "@/redux/services/website/socialApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Social() {
  const router = useRouter();
  const t = useTranslations("dashboard_website.social");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "socialcode",
      // eslint-disable-next-line
      useQueryHook: useGetSocialQuery,
    });

  const columns = [
    { field: "code", header: t("code") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [{ title: "newRequests", num: 145 }];

  const handleClick = () => {
    router.push("/dashboard/website/social/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("no_social_data_found")}
      editRoute="/dashboard/website/social/edit/"
      buttonText={t("add_social")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
