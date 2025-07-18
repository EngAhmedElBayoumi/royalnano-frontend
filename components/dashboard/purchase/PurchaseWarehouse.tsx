"use client";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { useGetWarehousesQuery } from "@/redux/services/dashboard/purchase/warehouseApi";

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  description: string;
}

export default function PurchaseWarehouse() {
  const { data: warehousesData, isLoading, error, permissions, handlePageChange } = useTableData({
    permissionKey: "warehouse",
    useQueryHook: useGetWarehousesQuery,
  });

  const router = useRouter();
  const params = useParams();
  const { locale } = params;
  const t = useTranslations("purchase.Warehouse");

  const columns = [
    { field: "name", header: t("name") },
    { field: "location", header: t("location") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: t("cards.totalWarehouses"), num: warehousesData?.count || 0 },
    { title: t("cards.activeWarehouses"), num: warehousesData?.results?.length || 0 },
    { title: t("cards.withLocation"), num: warehousesData?.results?.filter((wh: Warehouse) => wh.location && wh.location.trim() !== '').length || 0 },
    { title: t("cards.withDescription"), num: warehousesData?.results?.filter((wh: Warehouse) => wh.description && wh.description.trim() !== '').length || 0 },
  ];

  const formattedData =
    warehousesData?.results?.map((warehouse: Warehouse) => ({
      id: warehouse.id,
      name: warehouse.name || "-",
      location: warehouse.location || "-",
      description: warehouse.description || "-",
    })) || [];

  const handleClick = () => {
    router.push("/dashboard/purchase/warehouse/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: formattedData, count: warehousesData?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noDataFound")}
      editRoute="/dashboard/purchase/warehouse/edit"
      buttonText={t("addWarehouse")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}

