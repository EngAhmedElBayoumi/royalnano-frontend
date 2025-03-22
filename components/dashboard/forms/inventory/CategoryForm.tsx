"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/lib/validations/dashboard/inventory/categorySchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  defaultValues?: CategoryFormValues;
  isLoading?: boolean;
}

export interface CategoryFormValues {
  name: string;
}

const CategoryForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: CategoryFormProps) => {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues || {
      name: "",
    },
  });

  const t = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("Inventory.InventoryCategory.categoryName")}
              placeholder={t("Inventory.InventoryCategory.categoryName")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/inventory?tab=${t("Inventory.categoryModel")}`}
            passHref
          >
            <CustomButton
              text={t("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={
              isLoading ? globalTranslate("saving") : globalTranslate("save")
            }
            isDisabled={isLoading}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
