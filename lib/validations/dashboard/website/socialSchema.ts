import * as z from "zod";

export const socialSchema = z.object({
  code: z.string().nonempty("Social Media Code is required"),
  description: z.string().optional(),
});
