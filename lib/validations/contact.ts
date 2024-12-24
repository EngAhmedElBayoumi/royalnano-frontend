import * as z from "zod";

export const aboutValidation = z.object({
  full_name: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name is too long")
    .nonempty("Full Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone_number: z
    .string()
    .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number")
    .nonempty("Phone number is required"),
  message: z
    .string()
    .min(3, "Message must be at least 3 characters")
    .max(1000, "Message is too long")
    .nonempty("Message is required"),
});
