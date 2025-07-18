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
import { purchaseOrderSchema } from "@/lib/validations/dashboard/purchase/purchaseOrderSchema";
import { useState, useEffect } from "react";

interface PurchaseOrderFormProps {
  onSubmit: (data: PurchaseOrderFormValues) => Promise<void>;
  defaultValues?: PurchaseOrderFormValues;
  isView?: boolean;
}

export interface PurchaseOrderFormValues {
  order_date: string;
  offer_expiry: string;
  prefix: string;
  delivery_date: string;
  due_date: string;
  branch: number;
  supplier: number;
  description: string;
  items: {
    kind: string;
    name: string;
    unit: string;
    quantity: number;
    unit_price: string;
    bonus: string;
    amount: string;
    discount: string;
    discount_percent: string;
    vat_kd: string;
    total: string;
  }[];
  invoice_detail: {
    discount: string;
    vat: string;
    subtotal: string;
    quantity: number;
    free_quantity: number;
    total: string;
  };
}

const PurchaseOrderForm = ({
  onSubmit,
  defaultValues,
  isView,
}: PurchaseOrderFormProps) => {
  const [branches, setBranches] = useState<{ value: string; label: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ value: string; label: string }[]>([]);
  const [units, setUnits] = useState<{ value: string; label: string }[]>([]);
  const [kinds, setKinds] = useState<{ value: string; label: string }[]>([]);

  const form = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: defaultValues || {
      order_date: "",
      offer_expiry: "",
      prefix: "",
      delivery_date: "",
      due_date: "",
      branch: 0,
      supplier: 0,
      description: "",
      items: [
        {
          kind: "",
          name: "",
          unit: "",
          quantity: 1,
          unit_price: "",
          bonus: "",
          amount: "",
          discount: "",
          discount_percent: "",
          vat_kd: "",
          total: "",
        },
      ],
      invoice_detail: {
        discount: "",
        vat: "",
        subtotal: "",
        quantity: 1,
        free_quantity: 1,
        total: "",
      },
    },
  });

  const t = useTranslations("Purchase.Order");

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch branches
        const branchesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/branches/`);
        if (branchesResponse.ok) {
          const branchesData = await branchesResponse.json();
          setBranches(branchesData.map((branch: any) => ({
            value: branch.id.toString(),
            label: branch.name
          })));
        }

        // Fetch suppliers
        const suppliersResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/suppliers/`);
        if (suppliersResponse.ok) {
          const suppliersData = await suppliersResponse.json();
          setSuppliers(suppliersData.map((supplier: any) => ({
            value: supplier.id.toString(),
            label: supplier.supplier_name
          })));
        }

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
          {/* Top-Level Fields */}
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="order_date"
              label={t("orderDate")}
              placeholder={t("orderDate")}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="offer_expiry"
              label={t("offerExpiry")}
              placeholder={t("offerExpiry")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="prefix"
              label={t("prefix")}
              placeholder={t("prefix")}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="delivery_date"
              label={t("deliveryDate")}
              placeholder={t("deliveryDate")}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="due_date"
              label={t("dueDate")}
              placeholder={t("dueDate")}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branches}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="supplier"
              label={t("supplier")}
              placeholder={t("supplier")}
              options={suppliers}
              readonly={isView}
              valueType="number"
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("description")}
              placeholder={t("description")}
              readonly={isView}
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
                  name={`items.${index}.name`}
                  label={t("name")}
                  placeholder={t("name")}
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
                  name={`items.${index}.bonus`}
                  label={t("bonus")}
                  placeholder={t("bonus")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.amount`}
                  label={t("amount")}
                  placeholder={t("amount")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount`}
                  label={t("discount")}
                  placeholder={t("discount")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount_percent`}
                  label={t("discountPercent")}
                  placeholder={t("discountPercent")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.vat_kd`}
                  label={t("vatKd")}
                  placeholder={t("vatKd")}
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
              </div>
            ))}
          </div>

          {/* Invoice Detail */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("invoiceDetail")}</h3>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
              <TextInput
                control={form.control}
                name="invoice_detail.discount"
                label={t("discount")}
                placeholder={t("discount")}
                readonly={isView}
                type="number"
              />
              <TextInput
                control={form.control}
                name="invoice_detail.vat"
                label={t("vat")}
                placeholder={t("vat")}
                readonly={isView}
                type="number"
              />
              <TextInput
                control={form.control}
                name="invoice_detail.subtotal"
                label={t("subtotal")}
                placeholder={t("subtotal")}
                readonly={true}
                type="number"
              />
              <TextInput
                control={form.control}
                name="invoice_detail.quantity"
                label={t("quantity")}
                placeholder={t("quantity")}
                readonly={true}
                type="number"
              />
              <TextInput
                control={form.control}
                name="invoice_detail.free_quantity"
                label={t("freeQuantity")}
                placeholder={t("freeQuantity")}
                readonly={isView}
                type="number"
              />
              <TextInput
                control={form.control}
                name="invoice_detail.total"
                label={t("total")}
                placeholder={t("total")}
                readonly={true}
                type="number"
              />
            </div>
          </div>
        </section>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/purchase?tab=order" passHref>
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton text={t("save")} />
          </div>
        )}
      </form>
    </Form>
  );
};

export default PurchaseOrderForm;

