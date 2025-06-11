"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetGalleryQuery } from "@/redux/services/website/galleryApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Gallery() {
  const router = useRouter();
  const t = useTranslations("dashboard_website.gallery");

  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "service",
      // eslint-disable-next-line
      useQueryHook: useGetGalleryQuery,
    });

  const columns = [
    { field: "title", header: t("title") },
    { field: "item_type", header: t("item_type") },
    { field: "gallery_images", header: t("image") },
    { field: "video", header: t("video") },
  ];

  const cardsData = [
    { title: "Total Entries", num: data?.length },
    {
      title: "Images",
      num: data?.filter(
        (item: { item_type: string }) => item.item_type === "image"
      ).length,
    },
    {
      title: "Videos",
      num: data?.filter(
        (item: { item_type: string }) => item.item_type === "video"
      ).length,
    },
  ];

  const handleClick = () => {
    router.push("/dashboard/website/gallery/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noGalleryDataFound")}
      editRoute="/dashboard/website/gallery/edit/"
      buttonText={t("addGallery")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
