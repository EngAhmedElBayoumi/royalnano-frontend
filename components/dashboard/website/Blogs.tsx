"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetBlogsQuery } from "@/redux/services/website/blogsApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Blogs() {
  const router = useRouter();
  const t = useTranslations("dashboardWebsite.Blogs");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "blog",
      // eslint-disable-next-line
      useQueryHook: useGetBlogsQuery,
    });
  console.log(data);

  const columns = [
    { field: "title", header: t("title") },
    { field: "content", header: t("content") },
    { field: "image", header: t("image") },
  ];

  const cardsData = [{ title: "newRequests", num: 145 }];

  const handleClick = () => {
    router.push("/dashboard/website/blogs/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noBlogsDataFound")}
      editRoute="/dashboard/website/blogs/edit/"
      buttonText={t("addBlog")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
