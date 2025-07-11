"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetUnitsQuery } from "@/redux/services/dashboard/inventory/unitsApi";
import { useTableData } from "@/hooks/useTableData";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";

export default function Units() {
  const { data, isLoading, error, permissions, handlePageChange } =
    useTableData({
      permissionKey: "unit",
      useQueryHook: useGetUnitsQuery,
    });

  const router = useRouter();
  const t = useTranslations("Inventory.InventoryUnit");

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: t("unitName") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];
  const handleClick = () => {
    router.push("/dashboard/inventory/units/create");
  };
  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noUnitsDataFound")}
      editRoute="/dashboard/inventory/units/edit"
      buttonText={t("addUnit")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
