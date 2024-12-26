import * as z from "zod";

export const changePasswordValidation = z.object({
  password: z
    .string()
    .min(3, "Password must be at least 3 characters") // Ensures password has a minimum length
    .max(1000, "Password is too long") // Ensures password does not exceed maximum length
    .nonempty("Password is required"), // Ensures password is not empty

  confirmPassword: z.string().nonempty("Confirm password is required"), // Ensures confirm password is not empty
});
