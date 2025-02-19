import { z } from "zod";

export const salesInvoiceSchema = z.object({
  invoice_date: z.string().min(1, "Invoice date is required"),
  due_date: z.string().min(1, "Due date is required"),
  sales_representative: z.string().min(1, "Sales representative is required"),
  status: z.string().optional(),
  description: z.string().optional(),
  sales_order: z.number().min(1, "Sales order is required"),
  customer: z.number().min(1, "Customer is required"),
  branch: z.number().min(1, "Branch is required"),
  items: z.array(
    z.object({
      quantity: z.number().min(1, "Quantity is required"),
      sales_invoice: z.number().min(1, "Sales invoice is required"),
      custom_item_name: z.string().optional(),
      custom_price: z.string().optional(),
      discount: z.string().optional(),
      discount_percent: z.string().optional(),
      item: z.number().min(1, "Item is required"),
    })
  ),
});