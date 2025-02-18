import { z } from "zod";

export const salesInvoiceSchema = z.object({
  date: z.string().min(1, "Date is required"),
  customer: z.string().min(1, "Customer is required"),
  validity_period: z.string().min(1, "Validity period is required"),
  quotation_number: z.string().min(1, "Invoice number is required"),
  items: z
    .array(
      z.object({
        item_name: z.string().min(1, "Item name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unit_price: z.number().min(0, "Unit price must be a positive number"),
        discount: z.string().optional(),
        discount_percent: z.string().optional(),
        tax_rate: z.string().optional(),
      })
    )
    .nonempty("At least one item is required"),
});
