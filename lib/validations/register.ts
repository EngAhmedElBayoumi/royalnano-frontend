import * as z from "zod";

export const registerValidation = z
  .object({
    email: z
      .string()
      .email("Invalid email format") // Email format validation
      .nonempty("Email is required"), // Ensures email is not empty

    password: z
      .string()
      .min(3, "Password must be at least 3 characters") // Ensures password has a minimum length
      .max(1000, "Password is too long") // Ensures password does not exceed maximum length
      .nonempty("Password is required"), // Ensures password is not empty

    confirmPassword: z.string().nonempty("Confirm password is required"), // Ensures confirm password is not empty

    firstname: z
      .string()
      .nonempty("First name is required") // Ensures firstname is not empty
      .min(2, "First name must be at least 2 characters long"), // Minimum length for firstname

    lastname: z
      .string()
      .nonempty("Last name is required") // Ensures lastname is not empty
      .min(2, "Last name must be at least 2 characters long"), // Minimum length for lastname

    phone_number: z
      .string()
      .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number")
      .nonempty("Phone number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This ensures the error is attached to the confirmPassword field
  });
