"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetWarehouseByIdQuery } from "@/redux/services/dashboard/purchase/warehouseApi";
import WarehouseForm, {
  WarehouseFormValues,
} from "@/components/dashboard/purchase/WarehouseForm";
import ViewPage from "@/components/dashboard/ViewPage";

export default function ViewWarehouse() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("purchase.Warehouse");

  const { data, isLoading, error } = useGetWarehouseByIdQuery(id);

  const defaultValues: WarehouseFormValues | undefined = data && {
    name: data.name || "",
    location: data.location || "",
    description: data.description || "",
  };

  const handleSubmit = async (formData: WarehouseFormValues) => {
    console.log(formData);
  };

  return (
    <ViewPage
      title={t("viewWarehouse")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={WarehouseForm}
    />
  );
}
