import * as z from "zod";

export const loginValidation = z.object({
  email: z
    .string()
    .email("Invalid email format") // Email format validation
    .nonempty("Email is required"), // Ensures email is not empty

  password: z
    .string()
    .min(3, "Password must be at least 3 characters") // Ensures password has a minimum length
    .max(1000, "Password is too long") // Ensures password does not exceed maximum length
    .nonempty("Password is required"), // Ensures password is not empty
});
