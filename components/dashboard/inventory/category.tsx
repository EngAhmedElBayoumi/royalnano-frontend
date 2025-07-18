"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetItemCategoryQuery } from "@/redux/services/dashboard/inventory/itemCategoryApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Category() {
  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "expensecategory",
      useQueryHook: useGetItemCategoryQuery,
    });

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryCategory");

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: t("categoryName") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/inventory/category-models/create");
  };
  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noCategoriesDataFound") || "No categories data found"}
      editRoute="/dashboard/inventory/category-models/edit"
      buttonText={t("addCategory")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
