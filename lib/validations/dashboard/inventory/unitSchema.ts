import * as z from "zod";

export const unitSchema = z.object({
  name: z.string().nonempty("Unit name is required"),
});
