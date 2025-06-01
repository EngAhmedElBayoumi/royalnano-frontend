"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vacationSchema } from "@/lib/validations/dashboard/hr/vacationSchema";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
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
  start_date: string;
  end_date: string;
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
      // start_date: new Date(),
      // end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      start_date: "",
      end_date: "",
      reason: "",
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.vacation");
  const unitsOptions = [
    { value: "pending", label: "pending" },
    { value: "approved", label: "approved" },
    { value: "rejected", label: "rejected" },
  ];

  const { data: employees } = useGetEmployeesQuery({});
  const employeesOptions =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

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
              // disabledEndDate={form.watch("end_date")}
            />
            <DatePicker
              control={form.control}
              name="end_date"
              label={t("end_date")}
              placeholder={t("end_date")}
              // disabledStartDate={form.watch("start_date")}
              // disabledEndDate={
              //   new Date(
              //     form.watch("start_date").getTime() + 30 * 24 * 60 * 60 * 1000
              //   )
              // } // 30 days after 'start_date'
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
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/hr?tab=vacation" passHref>
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
      </form>
    </Form>
  );
};

export default VacationsForm;
