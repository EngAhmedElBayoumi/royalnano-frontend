"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreatePreorderMutation } from "@/redux/services/dashboard/inventory/preorderApi";
import CreatePage from "@/components/dashboard/CreatePage";
import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";

export default function CreatePreorder() {
  const t = useTranslations("Inventory.InventoryPreorder");
  const [createPreorder, { isLoading }] = useCreatePreorderMutation();

  const handleSubmit = async (data: PreorderFormValues) => {
    const payload = {
      ...data,
      item: Number(data.item),
    };
    const response = await createPreorder(payload);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("addPreorder")}
      onSubmit={handleSubmit}
      Form={PreorderForm}
      redirectPath="/dashboard/inventory?tab=preorder"
      isLoading={isLoading}
    />
  );
}
