import * as z from "zod";

export const forgetPasswordValidation = z.object({
  // phoneNumber: z
  //   .string()
  //   .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number")
  //   .nonempty("Phone number is required"),
  email_address: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),
});
