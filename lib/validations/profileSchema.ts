import * as z from "zod";

export const profileSchema = z.object({
  full_name: z.string().nonempty("Full name is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number"),
});
