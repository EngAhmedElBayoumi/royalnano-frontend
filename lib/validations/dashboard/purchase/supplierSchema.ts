import { z } from "zod";

export const supplierSchema = z.object({
  title: z.string().min(1, "Title is required"),
  full_name: z.string().min(1, "Full name is required"),
  supplier_name: z.string().min(1, "Supplier name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  taxes_business_id: z.string().min(1, "Taxes business ID is required"),
  expenses_rates_billing_rate: z.number().min(1, "Billing rate is required"),
  payment_terms: z.string().min(1, "Payment terms are required"),
  account_no: z.string().min(1, "Account number is required"),
  opening_balance: z.number().min(1, "Opening balance is required"),
  as_of: z.string().min(1, "As of date is required"),
  suffix: z.string().optional(),
  additional_info: z.string().optional(),
  branch: z.number().int().positive("Branch must be selected").optional().nullable(),
  accounting_expenses_category: z.number().int().positive("Accounting expenses category must be selected").optional().nullable(),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;

