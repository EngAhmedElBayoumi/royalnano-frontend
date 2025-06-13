import { z } from "zod";
export const salesQuotationSchema = z.object({
  date: z.string().min(1, "Date is required"),
  customer: z.number().min(1, "Customer is required"),
  validity_period: z.string().min(1, "Validity period is required"),
  quotation_number: z
    .string()
    .min(1, "Quotation number is required")
    .optional(),
  status: z.enum(["sent", "accepted", "draft", "rejected"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  items: z
    .array(
      z.object({
        item_name: z.string().min(1, "Item name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unit_price: z.string().min(1, "Unit price is required"),
        discount: z.string().optional(),
        discount_percent: z.string().optional(),
        tax_rate: z.string().optional(),
      })
    )
    .nonempty("At least one item is required"),
});
