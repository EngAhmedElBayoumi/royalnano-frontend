import * as z from "zod";

export const stockAdjustmentSchema = z.object({
  item: z.coerce.number().min(1, "Item must be selected"),
  reason: z.string().nonempty("Reason is required"),
  quantity_adjusted: z
    .number()
    .min(0, "Quantity must be a non-negative number"),
  adjustment_type: z.enum(["Increase", "Decrease"]),
  adjustment_date: z.date({ required_error: "Date is required" }),
  description: z.string().nonempty("Description is required"),
});
