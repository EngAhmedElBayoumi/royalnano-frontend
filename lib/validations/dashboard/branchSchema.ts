import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

export const branchSchema = z.object({
  branch_name: z.string().nonempty("Branch name is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  address: z.string().nonempty("Address is required"),
  branch_code: z.string().nonempty("Branch code is required"),
  email: z.string().email("Invalid email address"),
  branch_manager: z.string().nonempty("Branch manager is required"),
});
