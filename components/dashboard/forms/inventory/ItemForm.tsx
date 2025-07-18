"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema } from "@/lib/validations/dashboard/inventory/itemSchema";
import { useGetItemCategoryQuery } from "@/redux/services/dashboard/inventory/itemCategoryApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetSuppliersMiniQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useGetUnitsQuery } from "@/redux/services/dashboard/inventory/unitsApi";
import { listItems } from "@/lib/utils/types";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";
import useExtraFields from "@/hooks/useExtraFields";
import ExtraFields from "@/components/formFields/ExtraFields";

interface ItemFormProps {
  onSubmit: (data: ItemFormValues) => Promise<void>;
  defaultValues?: ItemFormValues;
  isLoading?: boolean;
}

export interface ItemFormValues {
  item_name: string;
  item_code: string;
  quantity: number;
  category: number;
  unit: number;
  purchase_price: number;
  selling_price: number;
  branch: number;
  supplier: number | null;
  description: string;
  extra_fields?: Record<string, string> | null;
}

const ItemForm = ({ onSubmit, defaultValues, isLoading }: ItemFormProps) => {
  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: defaultValues || {
      item_name: "",
      item_code: "",
      quantity: 0,
      category: 1,
      unit: 1,
      purchase_price: 0,
      selling_price: 0,
      branch: 1,
      supplier: null,
      description: "",
      extra_fields: {},
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("Inventory.InventoryItem");
  const { data: categories } = useGetItemCategoryQuery({});
  const { data: branches } = useGetBranchesQuery({});
  const { data: suppliers } = useGetSuppliersMiniQuery({});
  const { data: units } = useGetUnitsQuery({});

  const categoriesOptions =
    categories?.map((category: listItems) => ({
      value: String(category.id),
      label: category.name,
    })) || [];

  const unitsOptions =
    units?.results?.map((unit: listItems) => ({
      value: String(unit.id),
      label: unit.name,
    })) || [];

  const branchesOptions =
    branches?.results?.map((branch: listItems) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];

  const suppliersOptions =
    suppliers?.results?.map(
      (supplier: { id: number; supplier_name: string }) => ({
        value: String(supplier.id),
        label: supplier.supplier_name,
      })
    ) || [];

  const {
    extraFields,
    handleAddExtraField,
    handleRemoveExtraField,
    handleExtraFieldChange,
  } = useExtraFields({
    defaultFields: defaultValues?.extra_fields ?? {},
    setValue: form.setValue,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="item_name"
              label={t("itemName")}
              placeholder={t("itemName")}
            />
            <TextInput
              control={form.control}
              name="item_code"
              label={t("itemCode")}
              placeholder={t("itemCode")}
            />
            <TextInput
              control={form.control}
              name="quantity"
              label={t("quantity")}
              placeholder={t("quantity")}
              type="number"
            />
            <CustomSelect
              control={form.control}
              name="category"
              label={t("category")}
              placeholder={t("category")}
              options={categoriesOptions}
            />
            <CustomSelect
              control={form.control}
              name="unit"
              label={t("unit")}
              placeholder={t("unit")}
              options={unitsOptions}
            />
            <TextInput
              control={form.control}
              name="purchase_price"
              label={t("purchasePrice")}
              placeholder={t("purchasePrice")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="selling_price"
              label={t("sellingPrice")}
              placeholder={t("sellingPrice")}
              type="number"
            />
            <CustomSelect
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branchesOptions}
            />
            <CustomSelect
              control={form.control}
              name="supplier"
              label={t("supplier")}
              placeholder={t("supplier")}
              options={suppliersOptions}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
            className="mt-2 xl:mt-5"
          />
          <ExtraFields
            extraFields={extraFields}
            onAddField={handleAddExtraField}
            onRemoveField={handleRemoveExtraField}
            onFieldChange={handleExtraFieldChange}
          />
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/inventory" passHref>
            <CustomButton
              text={globalTranslate("cancel")}
              variant="secondary"
            />
          </Link>
          <CustomButton
            text={
              isLoading ? globalTranslate("saving") : globalTranslate("save")
            }
            isDisabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default ItemForm;
