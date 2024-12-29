import * as z from "zod";

export const registerValidation = z
  .object({
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),

    password: z
      .string()
      .min(3, "Password must be at least 3 characters")
      .max(1000, "Password is too long")
      .nonempty("Password is required"),

    confirmPassword: z.string().nonempty("Confirm password is required"),

    firstname: z
      .string()
      .nonempty("First name is required")
      .min(2, "First name must be at least 2 characters long"),

    lastname: z
      .string()
      .nonempty("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),

    phone_number: z
      .string()
      .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number")
      .nonempty("Phone number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
