"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Services() {
  const router = useRouter();
  const t = useTranslations("dashboardWebsite.Services");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "service",
      // eslint-disable-next-line
      useQueryHook: useGetServicesQuery,
    });
    console.log(data)

  const columns = [
    { field: "name", header: t("name") },
    { field: "alias", header: t("alias") },
    { field: "description", header: t("description") },
    { field: "image", header: t("image") },
  ];

  const cardsData = [{ title: "newRequests", num: 145 }];

  const handleClick = () => {
    router.push("/dashboard/website/services/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noServicesDataFound")}
      editRoute="/dashboard/website/services/edit/"
      buttonText={t("addService")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
