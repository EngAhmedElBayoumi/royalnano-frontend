import * as z from "zod";

export const aboutValidation = z.object({
  full_name: z
    .string()
    .nonempty("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name is too long"),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number"),
  message: z
    .string()
    .nonempty("Message is required")
    .min(3, "Message must be at least 3 characters")
    .max(1000, "Message is too long"),
});
