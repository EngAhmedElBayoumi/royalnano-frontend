"use client";
import { useRouter } from "next/navigation";
import { useGetMovementsQuery } from "@/redux/services/dashboard/inventory/movementApi";
import { useTranslations } from "next-intl";
import TableWrapper from "@/components/dashboard/tables/TableWrapper";
import { useTableData } from "@/hooks/useTableData";
import { listItems } from "@/lib/utils/types";

// Define the type for movement
interface Movement {
  id: number;
  item: {
    id: number;
    item_name: string;
    item_code: string;
  };
  movement_date: string;
  quantity: number;
  from_branch: listItems;
  to_branch: listItems;
  description: string;
}

export default function Movement() {
  const router = useRouter();
  const t = useTranslations("Inventory.InventoryMovement");

  const {
    data: movementData = { results: [] },
    isLoading,
    error,
    permissions,
    handlePageChange,
  } = useTableData({
    permissionKey: "movement",
    useQueryHook: useGetMovementsQuery,
  });

  // Transform movementData to only include item_name
  const transformedData = movementData.results.map((movement: Movement) => ({
    ...movement,
    item: movement.item.item_name,
    from_branch: movement.from_branch.name,
    to_branch: movement.to_branch.name,
  }));

  const columns = [
    { field: "id", header: "ID" },
    { field: "item", header: t("item") },
    { field: "quantity", header: t("quantity") },
    { field: "movement_date", header: t("date") },
    { field: "from_branch", header: t("fromBranch") },
    { field: "to_branch", header: t("toBranch") },
    { field: "description", header: t("description") },
  ];

  const cardsData = [
    { title: "New requests", num: 145 },
    { title: "Complete", num: 87 },
    { title: "Pending", num: 3200 },
    { title: "Failed", num: 48 },
    { title: "Paid", num: 48 },
  ];

  const handleClick = () => {
    router.push("/dashboard/inventory/movement/create");
  };

  return (
    <TableWrapper
      isLoading={isLoading}
      error={error}
      data={{ results: transformedData, count: movementData?.count || 0 }}
      columns={columns}
      cardData={cardsData}
      emptyMessage={t("noMovementsDataFound") || "No movements data found"}
      editRoute="/dashboard/inventory/movement/edit/"
      viewRoute="/dashboard/inventory/movement/view/"
      buttonText={t("addMovement")}
      ButtonEvent={handleClick}
      onPageChange={handlePageChange}
      permissions={permissions}
    />
  );
}
