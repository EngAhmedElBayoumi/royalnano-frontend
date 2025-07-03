import CustomButton from "@/components/formFields/CustomButton";
import CustomSelect from "@/components/formFields/CustomSelect";
import DatePicker from "@/components/formFields/DatePicker";
import TextInput from "@/components/formFields/TextInput";
import { voucherSchema } from "@/lib/validations/dashboard/finance/voucherSchema";
import { useGetFinanceQuery } from "@/redux/services/dashboard/finance/financeApi";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useGetInvoicesQuery } from "@/redux/services/dashboard/purchase/invoiceApi";
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

interface AccountOption {
  value: string;
  label: string;
}

interface SupplierOption {
  value: string;
  label: string;
}

interface InvoiceOption {
  value: string;
  label: string;
}

interface Account {
  id: number;
  name: string;
  code: string;
}

interface Supplier {
  id: number;
  supplier_name: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
}

const VoucherForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: VoucherFormProps) => {
  const globalTranslate = useTranslations();
  
  // Fetch data from APIs
  const { data: accounts } = useGetFinanceQuery({});
  const { data: suppliers } = useGetSuppliersQuery({});
  const { data: invoices } = useGetInvoicesQuery({});
  
  console.log("accounts", accounts);
  console.log("suppliers", suppliers);
  console.log("invoices", invoices);

  // Create options arrays
  const accountOptions: AccountOption[] = accounts?.map((account: Account): AccountOption => ({
    value: account.id.toString(),
    label: `${account.code} - ${account.name}`
  })) || [];

  const supplierOptions: SupplierOption[] = suppliers?.results?.map((supplier: Supplier): SupplierOption => ({
    value: supplier.id.toString(),
    label: supplier.supplier_name
  })) || [];

  const invoiceOptions: InvoiceOption[] = invoices?.results?.map((invoice: Invoice): InvoiceOption => ({
    value: invoice.id.toString(),
    label: `#${invoice.invoice_number}`
  })) || [];

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
          options={accountOptions}
          placeholder="Select Account"
          control={form?.control}
        />
        
        <CustomSelect
          name="supplier"
          label="Supplier"
          options={supplierOptions}
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
          options={invoiceOptions}
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