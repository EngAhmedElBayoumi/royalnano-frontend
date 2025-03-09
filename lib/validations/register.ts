import * as z from "zod";
import { phoneRegex } from "../utils/phoneRegex";

export const registerValidation = z.object({
  email_address: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(3, "Password must be at least 3 characters")
    .max(1000, "Password is too long"),

  // confirmPassword: z.string().nonempty("Confirm password is required"),

  name: z
    .string()
    .nonempty("name is required")
    .min(2, "name must be at least 2 characters long"),

  // lastname: z
  //   .string()
  //   .nonempty("Last name is required")
  //   .min(2, "Last name must be at least 2 characters long"),

 phone_number: z
         .string()
         .nonempty("Phone number is required")
         .regex(phoneRegex, "Invalid phone number"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"],
// });
