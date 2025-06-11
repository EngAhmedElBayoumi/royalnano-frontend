import { useTranslations } from "next-intl";
import { useGetContactsQuery } from "@/redux/services/website/contactApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function ContactUs() {
  const t = useTranslations("dashboard_website.contacts");

  const columns = [
    { field: "full_name", header: t("full_name") },
    { field: "email", header: t("email") },
    { field: "phone_number", header: t("phone_number") },
    { field: "message", header: t("message") },
  ];

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "contact",
      // eslint-disable-next-line
      useQueryHook: useGetContactsQuery,
    });
  const cardsData = [
    { title: "Total Messages", num: data?.length },
    { title: "Unread", num: 3 },
    { title: "Responded", num: 2 },
  ];

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noContactDataFound")}
      ButtonEvent={() => console.log("")}
      onPageChange={handlePageChange}
      permissions={{
        canView: permissions.canView,
        canAdd: false,
        canUpdate: false,
      }}
    />
  );
}
