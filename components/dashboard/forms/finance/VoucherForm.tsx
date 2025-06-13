import CustomButton from "@/components/formFields/CustomButton";
import CustomSelect from "@/components/formFields/CustomSelect";
import DatePicker from "@/components/formFields/DatePicker";
import TextInput from "@/components/formFields/TextInput";
import { voucherSchema } from "@/lib/validations/dashboard/finance/voucherSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

export interface VoucherFormValues {
  account: number;
  supplier: number;
  payment_date: string;
  payment_method: string;
  amount_paid: string | number;
  purchase_invoice: number;
  description: string;
}

export interface VoucherFormProps {
  onSubmit: (data: VoucherFormValues) => Promise<void>;
  defaultValues?: VoucherFormValues;
  isLoading?: boolean;
}

const VoucherForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: VoucherFormProps) => {
  const globalTranslate = useTranslations();
  const form = useForm({
    resolver: zodResolver(voucherSchema),
    defaultValues: defaultValues || {
      account: 1,
      supplier: 1,
      payment_date: "",
      payment_method: "",
      amount_paid: "",
      purchase_invoice: 1,
      description: "",
    },
  });
  console.log("defaultValues", form.getValues());
  
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid  gap-6"
      >
        <CustomSelect
          name="account"
          label="Account"
          options={[]} // Add your account options here
          placeholder="Select Account"
          control={form?.control}
        />
        
        <CustomSelect
          name="supplier"
          label="Supplier"
          options={[]} // Add your supplier options here
          placeholder="Select Supplier"
          control={form?.control}
        />
        
        <TextInput
          name="amount_paid"
          label="Amount Paid"
          type="number"
          placeholder="Enter Amount Paid"
          control={form?.control}
        />

        <CustomSelect
          name="payment_method"
          label="Payment Method"
          options={[
            { value: "cash", label: "Cash" },
            { value: "bank_transfer", label: "Bank Transfer" },
            { value: "cheque", label: "Cheque" },
          ]}
          placeholder="Select Payment Method"
          control={form?.control}
        />
        
        <DatePicker
          name="payment_date"
          label="Payment Date"
          placeholder="Select Payment Date"
          control={form?.control}
        />
        
        <CustomSelect
          name="purchase_invoice"
          label="Purchase Invoice"
          options={[]} // Add your purchase invoice options here
          placeholder="Select Purchase Invoice"
          control={form?.control}
        />
        
        <TextInput
          name="description"
          label="Description"
          placeholder="Enter Description"
          control={form?.control}
        />
        
        <CustomButton  
          isDisabled={isLoading}
          text={isLoading ? globalTranslate("saving") : globalTranslate("save")}
        />
      </form>
    </Form>
  );
};

export default VoucherForm;