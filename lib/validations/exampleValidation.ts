import { string, z } from "zod";

export const exampleValidation = z.object({
  msg: string().min(3),
});
