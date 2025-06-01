"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { unitSchema } from "@/lib/validations/dashboard/inventory/unitSchema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";

export interface UnitFormValues {
  name: string;
}
interface UnitFormProps {
  onSubmit: (data: UnitFormValues) => Promise<void>;
  defaultValues?: UnitFormValues;
  isLoading?: boolean;
}

const UnitForm = ({ onSubmit, defaultValues, isLoading }: UnitFormProps) => {
  const form = useForm({
    resolver: zodResolver(unitSchema),
    defaultValues: defaultValues || {
      name: "",
    },
  });

  const t = useTranslations();
  const globalTranslate = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("Inventory.InventoryUnit.unitName")}
              placeholder={t("Inventory.InventoryUnit.unitName")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/inventory?tab=units" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
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

export default UnitForm;
