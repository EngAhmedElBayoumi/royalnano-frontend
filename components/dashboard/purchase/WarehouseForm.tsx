"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { Form } from '@/components/ui/form';
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from '@/components/formFields/TextInput';
import CustomTextArea from "@/components/formFields/TextArea";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  location: z.string().optional(),
  description: z.string().optional(),
});

export type WarehouseFormValues = z.infer<typeof formSchema>;

interface WarehouseFormProps {
  onSubmit: (data: WarehouseFormValues) => Promise<void>;
  isLoading?: boolean;
  defaultValues?: WarehouseFormValues;
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
}) => {
  const t = useTranslations("purchase.Warehouse");
  const tGlobal = useTranslations();

  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      location: "",
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
              name="name" 
              label={t("name")} 
              placeholder={t("name")} 
            />
            <TextInput 
              control={form.control} 
              name="location" 
              label={t("location")} 
              placeholder={t("location")} 
            />
          </div>
          
          <CustomTextArea
            control={form.control}
            name="description"
            label={t("description")} 
            placeholder={t("description")} 
            className="mt-2 xl:mt-5"
          />

          {form.formState.errors.root?.serverError && (
            <p className="text-red-500 text-xs italic mt-2">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
        </section>

        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/purchase?tab=warehouse" passHref>
            <CustomButton text={tGlobal("cancel")} variant="secondary" />
          </Link>

          <CustomButton
            text={isLoading ? tGlobal("saving") : tGlobal("save")}
            isDisabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default WarehouseForm;



