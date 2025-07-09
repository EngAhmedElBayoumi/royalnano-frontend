import { z } from "zod";

const itemSchema = z.object({
  kind: z.string().min(1, "Kind is required"),
  item_kind: z.string().min(1, "Item kind is required"),
  item_name: z.string().min(1, "Item name is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  unit_price: z.string().min(1, "Unit price is required"),
  total: z.string().optional(),
  description: z.string().optional(),
});

export const purchaseRequestSchema = z.object({
  request_date: z.string().min(1, "Request date is required"),
  description: z.string().optional(),
  request_by: z.number().int().positive("Request by must be selected"),
  branch: z.number().int().positive("Branch must be selected"),
  items: z.array(itemSchema).nonempty("At least one item is required"),
});

export type PurchaseRequestFormValues = z.infer<typeof purchaseRequestSchema>;

