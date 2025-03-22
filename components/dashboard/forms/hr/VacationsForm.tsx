"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vacationSchema } from "@/lib/validations/dashboard/hr/vacationSchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";

interface VacationsFormProps {
  onSubmit: (data: VacationsFormValues) => Promise<void>;
  defaultValues?: VacationsFormValues;
  isLoading?: boolean;
}

export interface VacationsFormValues {
  employee: string;
  status: string;
  start_date: Date;
  end_date: Date;
  reason: string;
}

const VacationsForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: VacationsFormProps) => {
  const form = useForm({
    resolver: zodResolver(vacationSchema),
    defaultValues: defaultValues || {
      employee: "",
      status: "pending",
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      reason: "",
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.bonuses");
  const unitsOptions = [
    { value: "pending", label: "pending" },
    { value: "approved", label: "approved" },
    { value: "rejected", label: "rejected" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="employee"
              label={t("employee")}
              placeholder={t("employee")}
              readonly={true}
            />
            <CustomSelect
              control={form.control}
              name="status"
              label={t("status")}
              placeholder={t("status")}
              options={unitsOptions}
            />
            <DatePicker
              control={form.control}
              name="start_date"
              label={t("start_date")}
              placeholder={t("start_date")}
              disabledEndDate={form.watch("end_date")}
              readonly={true}
            />
            <DatePicker
              control={form.control}
              name="end_date"
              label={t("end_date")}
              placeholder={t("end_date")}
              disabledStartDate={form.watch("start_date")}
              disabledEndDate={
                new Date(
                  form.watch("start_date").getTime() + 30 * 24 * 60 * 60 * 1000
                )
              } // 30 days after 'start_date'
              readonly={true}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="reason"
            label={t("reason")}
            placeholder={t("reason")}
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.vacation")}`}
            passHref
          >
            <CustomButton
              text={globalTranslate("cancel")}
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

export default VacationsForm;
