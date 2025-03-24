import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

export const profileSchema = z.object({
  name: z.string().nonempty("Full name is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
});
