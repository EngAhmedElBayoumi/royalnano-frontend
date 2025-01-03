import * as z from "zod";

export const loginValidation = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(3, "Password must be at least 3 characters")
    .max(1000, "Password is too long"),
});
