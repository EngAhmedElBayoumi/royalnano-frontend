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
import { purchaseInvoiceSchema } from "@/lib/validations/dashboard/purchase/purchaseInvoiceSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useGetWarehousesQuery } from "@/redux/services/dashboard/purchase/warehouseApi";
import { useGetOrdersQuery } from "@/redux/services/dashboard/purchase/orderApi";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { useEffect } from "react";
import { listItems } from "@/lib/utils/types";

interface PurchaseInvoiceFormProps {
  onSubmit: (data: PurchaseInvoiceFormValues) => Promise<void>;
  defaultValues?: PurchaseInvoiceFormValues;
  isView?: boolean;
}

export interface PurchaseInvoiceFormValues {
  voucher_date: string;
  warehouse: number;
  prefix: string;
  close_kind: string;
  due_date: string;
  branch: number;
  supplier: number;
  purchase_order?: number;
  description: string;
  status: string;
  items: {
    item: number;
    quantity: number;
    unit_price: number;
    discount: number;
    tax: number;
    total: number;
  }[];
}

const PurchaseInvoiceForm = ({
  onSubmit,
  defaultValues,
  isView = false,
}: PurchaseInvoiceFormProps) => {
  const form = useForm<PurchaseInvoiceFormValues>({
    resolver: zodResolver(purchaseInvoiceSchema),
    defaultValues: defaultValues || {
      voucher_date: "",
      warehouse: 0,
      prefix: "",
      close_kind: "",
      due_date: "",
      branch: 0,
      supplier: 0,
      purchase_order: 0,
      description: "",
      status: "pending",
      items: [
        {
          item: 0,
          quantity: 1,
          unit_price: 0,
          discount: 0,
          tax: 0,
          total: 0,
        },
      ],
    },
  });

  const t = useTranslations("purchase.Invoice");
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: suppliersData } = useGetSuppliersQuery({});
  const { data: warehousesData } = useGetWarehousesQuery({});
  const { data: ordersData } = useGetOrdersQuery({});
  const { data: itemsData } = useGetItemsQuery({});

  const branchOptions =
    branchesData?.results?.map((branch: listItems) => ({
      label: branch.name,
      value: branch.id.toString(),
    })) || [];

  const supplierOptions =
    suppliersData?.results?.map(
      (supplier: { id: string; supplier_name: string }) => ({
        label: supplier.supplier_name,
        value: supplier.id.toString(),
      })
    ) || [];

  const warehouseOptions =
    warehousesData?.results?.map((warehouse: listItems) => ({
      label: warehouse.name,
      value: warehouse.id.toString(),
    })) || [];

  const orderOptions =
    ordersData?.results?.map(
      (order: {
        id: string;
        prefix: string;
        supplier: { supplier_name: string };
      }) => ({
        label: `${order.prefix} - ${
          order.supplier?.supplier_name || "No Supplier"
        }`,
        value: order.id.toString(),
      })
    ) || [];

  const itemsOptions =
    itemsData?.results?.map(
      (item: { id: string; item_code: string; item_name: string }) => ({
        label: `${item.item_code} - ${item.item_name}`,
        value: item.id.toString(),
      })
    ) || [];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const closeKindOptions = [
    { value: "full", label: "Full Close" },
    { value: "partial", label: "Partial Close" },
    { value: "pending", label: "Pending" },
  ];

  const itemsWatch = form.watch("items");
  // Auto-calculate total for each item when relevant fields change
  useEffect(() => {
    const items = form.getValues("items");
    const updatedItems = items.map((item) => {
      const quantity = Number(item.quantity) || 0;
      const unit_price = Number(item.unit_price) || 0;
      const discount = Number(item.discount) || 0;
      const tax = Number(item.tax) || 0;
      const subtotal = quantity * unit_price - discount;
      const total = subtotal * (1 + tax / 100);
      return {
        ...item,
        total: Number.isFinite(total) ? Number(total.toFixed(2)) : 0,
      };
    });
    // Only update if values actually changed to avoid infinite loop
    if (JSON.stringify(items) !== JSON.stringify(updatedItems)) {
      form.setValue("items", updatedItems);
    }
  }, [form, itemsWatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="voucher_date"
              label={t("voucherDate")}
              placeholder={t("voucherDate")}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="warehouse"
              label={t("warehouse")}
              placeholder={t("warehouse")}
              options={warehouseOptions}
              readonly={isView}
              valueType="number"
            />
            <TextInput
              control={form.control}
              name="prefix"
              label={t("prefix")}
              placeholder={t("prefix")}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="close_kind"
              label={t("closeKind")}
              placeholder={t("closeKind")}
              options={closeKindOptions}
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
              options={branchOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="supplier"
              label={t("supplier")}
              placeholder={t("supplier")}
              options={supplierOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="purchase_order"
              label={t("purchaseOrder")}
              placeholder={t("purchaseOrder")}
              options={orderOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="status"
              label={t("status")}
              placeholder={t("status")}
              options={statusOptions}
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

          {/* Items Array */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("items")}</h3>
            {form.watch("items")?.map((item, index) => (
              <section
                key={index}
                className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10 mb-4 p-4 border rounded-lg"
              >
                <CustomSelect
                  control={form.control}
                  name={`items.${index}.item`}
                  label={t("item")}
                  placeholder={t("item")}
                  options={itemsOptions}
                  readonly={isView}
                  valueType="number"
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
                  name={`items.${index}.discount`}
                  label={t("discount")}
                  placeholder={t("discount")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.tax`}
                  label={t("tax")}
                  placeholder={t("tax")}
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
              </section>
            ))}
          </div>
        </section>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/purchase?tab=invoice" passHref>
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default PurchaseInvoiceForm;
