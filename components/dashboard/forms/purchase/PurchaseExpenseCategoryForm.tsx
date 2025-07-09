"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExpenseCategoryFormValues,
  expenseCategorySchema,
} from "@/lib/validations/dashboard/purchase/expenseCategorySchema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";

interface ExpenseCategoryFormProps {
  onSubmit: (data: ExpenseCategoryFormValues) => Promise<void>;
  defaultValues?: ExpenseCategoryFormValues;
  isView?: boolean;
}

const ExpenseCategoryForm = ({
  onSubmit,
  defaultValues,
  isView,
}: ExpenseCategoryFormProps) => {
  const form = useForm<ExpenseCategoryFormValues>({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
    },
  });

  const t = useTranslations("Purchase.ExpenseCategory");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
          <TextInput
            control={form.control}
            name="name"
            label={t("name")}
            placeholder={t("name")}
            readonly={isView}
          />

          <TextInput
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
            readonly={isView}
          />
        </div>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/purchase?tab=expense-category" passHref>
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default ExpenseCategoryForm;

