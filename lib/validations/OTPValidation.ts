import { z } from "zod";

export const OTPValidation = z.object({
  num1: z.string().min(1).max(1).regex(/^\d$/, "Must be a digit"),
  num2: z.string().min(1).max(1).regex(/^\d$/, "Must be a digit"),
  num3: z.string().min(1).max(1).regex(/^\d$/, "Must be a digit"),
  num4: z.string().min(1).max(1).regex(/^\d$/, "Must be a digit"),
  num5: z.string().min(1).max(1).regex(/^\d$/, "Must be a digit"),
  num6: z.string().min(1).max(1).regex(/^\d$/, "Must be a digit"),
});
