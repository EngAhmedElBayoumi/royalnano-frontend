import { z } from "zod";

const itemSchema = z.object({
  kind: z.string().min(1, "Kind is required"),
  item_kind: z.string().min(1, "Item kind is required"),
  item_name: z.string().min(1, "Item name is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit_price: z.string().min(1, "Unit price is required"),
  id: z.number().int().positive("ID must be a positive integer"),
  total: z.string().min(1, "Total is required"),
  description: z.string().min(1, "Description is required"),
});

export const purchaseRequestSchema = z.object({
  request_date: z.string().min(1, "Request date is required"),
  description: z.string().min(1, "Description is required"),
  request_by: z.string().min(1, "Request by is required"),
  branch: z.string().min(1, "Branch is required"),
  items: z.array(itemSchema).nonempty("At least one item is required"),
});

export type PurchaseRequestFormValues = z.infer<typeof purchaseRequestSchema>;
