import * as z from "zod";

export const movementSchema = z.object({
  item: z.coerce.number().min(1, "Item must be selected"),
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  movement_type: z.enum(["In", "Out"]),
  movement_date: z.date({ required_error: "Date is required" }),
  description: z.string().nonempty("Description is required"),
});
