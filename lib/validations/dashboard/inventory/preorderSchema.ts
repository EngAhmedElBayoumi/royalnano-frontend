import * as z from "zod";

export const preorderSchema = z.object({
  preorderLevel: z
    .number()
    .min(0, "Preorder level must be a non-negative number"),
  item: z.enum(["item 1", "item 2", "item 3"]),
  description: z.string().optional(),
});
