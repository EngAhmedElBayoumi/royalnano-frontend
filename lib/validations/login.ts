import * as z from "zod";

export const loginValidation = z.object({
  email_address: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),

  password: z.string().nonempty("Password is required"),
});
