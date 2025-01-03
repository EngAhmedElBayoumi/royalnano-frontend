import { z } from "zod";

export const OTPValidation = z.object({
  num1: z.number().min(1).max(1),
  num2: z.number().min(1).max(1),
  num3: z.number().min(1).max(1),
  num4: z.number().min(1).max(1),
  num5: z.number().min(1).max(1),
  num6: z.number().min(1).max(1),
});
