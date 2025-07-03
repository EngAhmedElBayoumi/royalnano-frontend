import CustomButton from "@/components/formFields/CustomButton";
import CustomSelect from "@/components/formFields/CustomSelect";
import TextInput from "@/components/formFields/TextInput";
import { Form } from "@/components/ui/form";
import { receiptSchema } from "@/lib/validations/dashboard/finance/receiptSchema";
import { useGetFinanceQuery } from "@/redux/services/dashboard/finance/financeApi";
import { useGetSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { useGetSalesInvoiceQuery } from "@/redux/services/dashboard/sales/salesInvoiceApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export interface ReceiptFormValues {
  invoice: number;
  customer: number;
  amount_received: string | number;
  account: number;
  reference_number: string|number;
  notes: string;
}

export interface ReceiptFormProps {
  onSubmit: (data: ReceiptFormValues) => Promise<void>;
  defaultValues?: ReceiptFormValues;
  isLoading?: boolean;
}

interface AccountOption {
  value: string;
  label: string;
}

interface CustomerOption {
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

interface Customer {
  id: number;
  customer_name: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
}

// ReceiptForm component for creating or editing receipt vouchers
const ReceiptForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: ReceiptFormProps) => {
  const globalTranslate = useTranslations();
  
  // Fetch data from APIs
  const { data: accounts } = useGetFinanceQuery({});
  const { data: customers } = useGetSalesCustomerQuery({});
  const { data: invoices } = useGetSalesInvoiceQuery({});
  
  console.log("accounts", accounts);
  console.log("customers", customers);
  console.log("invoices", invoices);

  // Create options arrays
  const accountOptions: AccountOption[] = accounts?.map((account: Account): AccountOption => ({
    value: account.id.toString(),
    label: `${account.code} - ${account.name}`
  })) || [];

  const customerOptions: CustomerOption[] = customers?.results?.map((customer: Customer): CustomerOption => ({
    value: customer.id.toString(),
    label: customer.customer_name
  })) || [];

  const invoiceOptions: InvoiceOption[] = invoices?.results?.map((invoice: Invoice): InvoiceOption => ({
    value: invoice.id.toString(),
    label: `#${invoice.invoice_number}`
  })) || [];
  const form = useForm({
    resolver: zodResolver(receiptSchema),
    defaultValues: defaultValues || {
        invoice: 1,
        customer: 1,
        amount_received: "",
        account: 1,
        reference_number: "",
        notes: "",
    },
  });
  console.log("defaultValues", form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid  gap-6">
        <CustomSelect
          name="account"
          label="Account"
          options={accountOptions}
          placeholder="Select Account"
          control={form?.control}
        />

        <CustomSelect
          name="customer"
          label="Customer"
          options={customerOptions} // Add your supplier options here
          placeholder="Select Customer"
          control={form?.control}
        />
        <CustomSelect
          name="invoice"
          label="Invoice"
          options={invoiceOptions} // Add your invoice options here
          placeholder="Select Invoice"
          control={form?.control}
        />
        <TextInput
          name="amount_received"
          label="Amount Paid"
          type="number"
          placeholder="Enter Amount Paid"
          control={form?.control}
        />

        <TextInput
          name="reference_number"
          label="Reference Number"
          placeholder="Enter Reference Number"
          control={form?.control}
        />

        <TextInput
          name="notes"
          label="Notes"
          placeholder="Enter Notes"
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
export default ReceiptForm;
