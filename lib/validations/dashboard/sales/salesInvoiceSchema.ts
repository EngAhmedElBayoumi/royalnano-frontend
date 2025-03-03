import { z } from "zod";

const itemSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
  sales_invoice: z.number().optional(), 
  custom_item_name: z.string().min(1, "Item name is required"),
  custom_price: z.string().min(1, "Custom price is required"),
  discount: z.string().optional(), 
  discount_percent: z.string().optional(), 
  item: z.number().min(1, "Item ID is required"),
});

export const salesInvoiceSchema = z.object({
  invoice_date: z.string().min(1, "Invoice date is required"),
  due_date: z.string().min(1, "Due date is required"),
  sales_representative: z.string().min(1, "Sales representative is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(), 
  sales_order: z.number().min(1, "Sales order is required"),
  customer: z.number().min(1, "Customer is required"),
  branch: z.number().min(1, "Branch is required"),
  items: z.array(itemSchema).min(1, "At least one item is required"), 
});

// Type for the form values
export type SalesInvoiceFormValues = z.infer<typeof salesInvoiceSchema>;