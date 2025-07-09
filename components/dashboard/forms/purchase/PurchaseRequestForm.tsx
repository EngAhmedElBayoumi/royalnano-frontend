"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import DatePicker from "@/components/formFields/DatePicker";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { purchaseRequestSchema } from "@/lib/validations/dashboard/purchase/purchaseRequestSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useState, useEffect } from "react";

interface PurchaseRequestFormProps {
  onSubmit: (data: PurchaseRequestFormValues) => Promise<void>;
  defaultValues?: PurchaseRequestFormValues;
  isView?: boolean;
}

export interface PurchaseRequestFormValues {
  request_date: string;
  description: string;
  request_by: number;
  branch: number;
  items: {
    kind: string;
    item_kind: string;
    item_name: string;
    unit: string;
    quantity: number;
    unit_price: string;
    total: string;
    description: string;
  }[];
}

const PurchaseRequestForm = ({
  onSubmit,
  defaultValues,
  isView = false,
}: PurchaseRequestFormProps) => {
  const [units, setUnits] = useState<{ value: string; label: string }[]>([]);
  const [kinds, setKinds] = useState<{ value: string; label: string }[]>([]);

  const form = useForm<PurchaseRequestFormValues>({
    resolver: zodResolver(purchaseRequestSchema),
    defaultValues: defaultValues || {
      request_date: "",
      description: "",
      request_by: 0,
      branch: 0,
      items: [
        {
          kind: "",
          item_kind: "",
          item_name: "",
          unit: "",
          quantity: 1,
          unit_price: "",
          total: "",
          description: "",
        },
      ],
    },
  });

  const t = useTranslations("Purchase.Request");
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: employeesData } = useGetEmployeesQuery({});

  const branchOptions = branchesData?.results?.map((branch: any) => ({
    label: branch.name,
    value: branch.id.toString(),
  })) || [];

  const employeeOptions = employeesData?.results?.map((employee: any) => ({
    label: employee.user?.email || employee.name || `Employee ${employee.id}`,
    value: employee.id.toString(),
  })) || [];

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch units (assuming there's a units endpoint)
        const unitsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/units/`);
        if (unitsResponse.ok) {
          const unitsData = await unitsResponse.json();
          setUnits(unitsData.map((unit: any) => ({
            value: unit.name,
            label: unit.name
          })));
        } else {
          // Fallback units if API doesn't exist
          setUnits([
            { value: "kg", label: "Kilogram" },
            { value: "pieces", label: "Pieces" },
            { value: "liters", label: "Liters" },
            { value: "meters", label: "Meters" },
            { value: "boxes", label: "Boxes" },
          ]);
        }

        // Fetch kinds (assuming there's a categories endpoint)
        const kindsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/categories/`);
        if (kindsResponse.ok) {
          const kindsData = await kindsResponse.json();
          setKinds(kindsData.map((kind: any) => ({
            value: kind.name,
            label: kind.name
          })));
        } else {
          // Fallback kinds if API doesn't exist
          setKinds([
            { value: "raw_materials", label: "Raw Materials" },
            { value: "finished_goods", label: "Finished Goods" },
            { value: "supplies", label: "Supplies" },
            { value: "equipment", label: "Equipment" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="request_date"
              label={t("requestDate")}
              placeholder={t("requestDate")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("description")}
              placeholder={t("description")}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="request_by"
              label={t("requestBy")}
              placeholder={t("requestBy")}
              options={employeeOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branchOptions}
              readonly={isView}
              valueType="number"
            />
          </div>

          {/* Items Array */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("items")}</h3>
            {form.watch("items")?.map((item, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10 mb-4 p-4 border rounded-lg"
              >
                <CustomSelect
                  control={form.control}
                  name={`items.${index}.kind`}
                  label={t("kind")}
                  placeholder={t("kind")}
                  options={kinds}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.item_kind`}
                  label={t("itemKind")}
                  placeholder={t("itemKind")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.item_name`}
                  label={t("itemName")}
                  placeholder={t("itemName")}
                  readonly={isView}
                />
                <CustomSelect
                  control={form.control}
                  name={`items.${index}.unit`}
                  label={t("unit")}
                  placeholder={t("unit")}
                  options={units}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("quantity")}
                  placeholder={t("quantity")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  label={t("unitPrice")}
                  placeholder={t("unitPrice")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.total`}
                  label={t("total")}
                  placeholder={t("total")}
                  readonly={true}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.description`}
                  label={t("description")}
                  placeholder={t("description")}
                  readonly={isView}
                />
              </div>
            ))}
          </div>
        </section>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/purchase?tab=request" passHref>
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default PurchaseRequestForm;

