"use client";

import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preorderSchema } from "@/lib/validations/dashboard/inventory/preorderSchema";
import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";

import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import TextArea from "@/components/formFields/TextArea";
import { Link } from "@/i18n/routing";
import CustomSelect from "@/components/formFields/CustomSelect";

interface PreorderFormProps {
  onSubmit: (data: PreorderFormValues) => Promise<void>;
  defaultValues?: PreorderFormValues;
}

export interface PreorderFormValues {
  preorder_level: number;
  item: string;
  description?: string;
}

const PreorderForm = ({ onSubmit, defaultValues }: PreorderFormProps) => {
  const t = useTranslations("Inventory");

  const { data: items } = useGetItemsQuery({});

  const itemsOptions =
    items?.results?.map((item: { id: number; item_name: string }) => ({
      value: String(item.id),
      label: item.item_name,
    })) || [];

  const form = useForm({
    resolver: zodResolver(preorderSchema),
    defaultValues: defaultValues || {
      preorder_level: 1,
      item: itemsOptions[0]?.label,
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="preorder_level"
              label="Preorder Level"
              placeholder="Preorder level"
              type="number"
            />

            <CustomSelect
              control={form.control}
              name="item"
              label="Item"
              placeholder="Item"
              options={itemsOptions}
            />
          </div>
          <TextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description Optional"
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/inventory?tab=${t("preorder")}`} passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default PreorderForm;
