"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movementSchema } from "@/lib/validations/dashboard/inventory/movementSchema";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { listItems } from "@/lib/utils/types";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";
import DatePicker from "@/components/formFields/DatePicker";

interface MovementFormProps {
  onSubmit: (data: MovementFormValues) => Promise<void>;
  defaultValues?: MovementFormValues;
  isView?: boolean;
  isLoading?: boolean;
}

export interface MovementFormValues {
  item: number;
  quantity: number;
  from_branch: number;
  to_branch: number;
  movement_date: Date;
  description: string;
  extra_fields?: Record<string, string> | null;
}

const MovementForm = ({
  onSubmit,
  defaultValues,
  isView,
  isLoading,
}: MovementFormProps) => {
  const t = useTranslations("Inventory.InventoryMovement");
  const globalTranslate = useTranslations();

  const form = useForm({
    resolver: zodResolver(movementSchema),
    defaultValues: defaultValues || {
      item: 1,
      quantity: 0,
      from_branch: 1,
      to_branch: 1,
      movement_date: new Date(),
      description: "",
      extra_fields: {},
    },
  });
  const { data: items } = useGetItemsQuery({});
  const { data: branches } = useGetBranchesQuery({});

  const itemsOptions =
    items?.results?.map((item: { id: number; item_name: string }) => ({
      value: String(item.id),
      label: item.item_name,
    })) || [];

  const branchesOptions =
    branches?.results?.map((branch: listItems) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="item"
              label={t("item")}
              placeholder={t("item")}
              options={itemsOptions}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="quantity"
              label={t("quantity")}
              placeholder={t("quantity")}
              type="number"
              readonly={isView}
            />

            <CustomSelect
              control={form.control}
              name="from_branch"
              label={t("from_branch")}
              placeholder={t("from_branch")}
              options={branchesOptions}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="to_branch"
              label={t("to_branch")}
              placeholder={t("to_branch")}
              options={branchesOptions}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="movement_date"
              label={t("date")}
              placeholder={t("date")}
              readonly={isView}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
            className="mt-2 xl:mt-5"
            readonly={isView}
          />
        </section>
        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/inventory?tab=movement" passHref>
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
        )}
      </form>
    </Form>
  );
};

export default MovementForm;
