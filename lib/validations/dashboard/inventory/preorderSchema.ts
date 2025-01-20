import * as z from "zod";

export const preorderSchema = z.object({
  preorderLevel: z
    .number()
    .min(0, "Preorder level must be a non-negative number"),
  item: z.string().nonempty("Item is required"),
  description: z.string().optional(),
});
