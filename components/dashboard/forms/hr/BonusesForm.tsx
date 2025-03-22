"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bonusSchema } from "@/lib/validations/dashboard/hr/bonusSchema";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import CustomSelect from "@/components/formFields/CustomSelect";

interface BonusesFormProps {
  onSubmit: (data: BonusesFormValues) => Promise<void>;
  defaultValues?: BonusesFormValues;
  isLoading?: boolean;
}

export interface BonusesFormValues {
  employee: number;
  amount: number;
  reason: string;
  type: string;
  date: string;
}

const BonusesForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: BonusesFormProps) => {
  const form = useForm({
    resolver: zodResolver(bonusSchema),
    defaultValues: defaultValues || {
      employee: 1,
      amount: 0,
      reason: "",
      type: "bonus",
      date: "",
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.bonuses");
  const { data: employees } = useGetEmployeesQuery({});

  const employeesOptions =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const typeOptions = [
    { value: "bonus", label: "Bonus" },
    { value: "deduction", label: "Deduction" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="employee"
              label={t("employee")}
              placeholder={t("employee")}
              options={employeesOptions}
            />
            <TextInput
              control={form.control}
              name="amount"
              label={t("amount")}
              placeholder={t("amount")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="reason"
              label={t("reason")}
              placeholder={t("reason")}
            />
            <CustomSelect
              control={form.control}
              name="type"
              label={t("type")}
              placeholder={t("type")}
              options={typeOptions}
            />
            <DatePicker
              control={form.control}
              name="date"
              label={t("date")}
              placeholder={t("date")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.bonuses")}`}
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

export default BonusesForm;
