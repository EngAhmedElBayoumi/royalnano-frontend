import * as z from "zod";

export const stockAdjustmentSchema = z.object({
  reason: z.string().nonempty("Reason is required"),
  item: z.string().nonempty("Item is required"),
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  type: z.string().nonempty("Type is required"),
  date: z.date({ required_error: "Date is required" }),
});
