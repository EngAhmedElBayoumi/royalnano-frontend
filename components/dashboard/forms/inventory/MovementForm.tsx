"use client";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movementSchema } from "@/lib/validations/dashboard/inventory/movementSchema";
import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";
import DatePicker from "@/components/formFields/DatePicker";
import { useTranslations } from "next-intl";

interface MovementFormProps {
  onSubmit: (data: MovementFormValues) => Promise<void>;
  defaultValues?: MovementFormValues;
  isView?: boolean;
}

export interface MovementFormValues {
  item: string;
  quantity: number;
  movement_type: string;
  movement_date: Date;
  description: string;
}

const MovementForm = ({
  onSubmit,
  defaultValues,
  isView,
}: MovementFormProps) => {
  const t = useTranslations();

  const form = useForm({
    resolver: zodResolver(movementSchema),
    defaultValues: defaultValues || {
      item: "",
      quantity: 0,
      movement_type: "",
      movement_date: new Date(),
      description: "",
    },
  });
  const { data: items } = useGetItemsQuery({});

  const itemsOptions =
    items?.results?.map((item: { id: number; item_name: string }) => ({
      value: String(item.id),
      label: item.item_name,
    })) || [];

  const typeOptions = [
    { value: "In", label: "In" },
    { value: "Out", label: "Out" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="item"
              label={t("Inventory.InventoryMovement.item")}
              placeholder={t("Inventory.InventoryMovement.item")}
              options={itemsOptions}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="quantity"
              label={t("Inventory.InventoryMovement.quantity")}
              placeholder={t("Inventory.InventoryMovement.quantity")}
              type="number"
              readonly={isView}
            />

            <CustomSelect
              control={form.control}
              name="movement_type"
              label={t("Inventory.InventoryMovement.movementType")}
              placeholder={t("Inventory.InventoryMovement.movementType")}
              options={typeOptions}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="movement_date"
              label={t("Inventory.InventoryMovement.date")}
              placeholder={t("Inventory.InventoryMovement.date")}
              readonly={isView}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label={t("Inventory.InventoryMovement.description")}
            placeholder={t("Inventory.InventoryMovement.description")}
            className="mt-2 xl:mt-5"
            readonly={isView}
          />
        </section>
        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <Link
              href={`/dashboard/inventory?tab=${t("Inventory.movement")}`}
              passHref
            >
              <CustomButton
                text={t("cancel")}
                className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
              />
            </Link>
            <CustomButton
              text={t("save")}
              className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </div>
        )}
      </form>
    </Form>
  );
};

export default MovementForm;
