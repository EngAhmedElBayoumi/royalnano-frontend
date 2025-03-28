"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const expenseCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type ExpenseCategoryFormValues = z.infer<typeof expenseCategorySchema>;

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
            label={t("Name")}
            placeholder={t("Name")}
            readonly={isView}
          />
          
          <TextInput
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
            readonly={isView}
            // multiline
            // rows={3}
          />
        </div>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <Link
              href="/dashboard/purchase/purchase-expense-category"
              passHref
            >
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