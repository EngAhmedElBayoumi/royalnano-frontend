import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

export const branchSchema = z.object({
  name: z.string().min(1).max(100, "Name must be at most 100 characters"),
  branch_code: z
    .string()
    .min(1)
    .max(10, "Branch code must be at most 10 characters"),
  location: z.string().max(100).optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  description: z.string().optional(),
  phone_number: z
    .string()
    .max(15)
    .regex(phoneRegex, "Invalid phone number")
    .optional(),
  email: z.string().email("Invalid email address").max(100).optional(),
  address: z.string().optional(),
  manager: z.coerce.number().optional(),
});
