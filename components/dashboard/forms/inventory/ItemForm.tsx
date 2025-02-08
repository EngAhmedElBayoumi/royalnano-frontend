"use client";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema } from "@/lib/validations/dashboard/inventory/itemSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";

interface ItemFormProps {
  onSubmit: (data: ItemFormValues) => Promise<void>;
  defaultValues?: ItemFormValues;
}

export interface ItemFormValues {
  item_name: string;
  item_code: string;
  quantity: number;
  category: number;
  unit: string;
  purchase_price: number;
  selling_price: number;
  branch: number;
  supplier: number;
  description: string;
}

const ItemForm = ({ onSubmit, defaultValues }: ItemFormProps) => {
  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: defaultValues || {
      item_name: "",
      item_code: "",
      quantity: 0,
      category: 1,
      unit: "",
      purchase_price: 0,
      selling_price: 0,
      branch: 1,
      supplier: 1,
      description: "",
    },
  });

  const categoriesOptions = [
    { value: "1", label: "SUV" },
    { value: "2", label: "Truck" },
  ];

  const unitsOptions = [
    { value: "Egp", label: "Egp" },
    { value: "Usd", label: "Usd" },
  ];

  const branchesOptions = [
    { value: "1", label: "October" },
    { value: "2", label: "Zagazig" },
  ];

  const suppliersOptions = [
    { value: "1", label: "October" },
    { value: "2", label: "Zagazig" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="item_name"
              label="Item Name"
              placeholder="Item Name"
            />
            <TextInput
              control={form.control}
              name="item_code"
              label="Item Code"
              placeholder="Item Code"
            />
            <TextInput
              control={form.control}
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              type="number"
            />
            <CustomSelect
              control={form.control}
              name="category"
              label="Category"
              placeholder="Category"
              options={categoriesOptions}
            />
            <CustomSelect
              control={form.control}
              name="unit"
              label="Unit"
              placeholder="Unit"
              options={unitsOptions}
            />
            <TextInput
              control={form.control}
              name="purchase_price"
              label="Purchase price"
              placeholder="Purchase price"
              type="number"
            />
            <TextInput
              control={form.control}
              name="selling_price"
              label="Selling price"
              placeholder="Selling price"
              type="number"
            />
            <CustomSelect
              control={form.control}
              name="branch"
              label="Branch"
              placeholder="Branch"
              options={branchesOptions}
            />
            <CustomSelect
              control={form.control}
              name="supplier"
              label="Supplier"
              placeholder="Supplier"
              options={suppliersOptions}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/inventory" passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default ItemForm;
