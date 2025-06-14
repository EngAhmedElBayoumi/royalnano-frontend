import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const serviceSchema = z.object({
  transaction_type: z.enum(["deposit", "withdraw"], {
    required_error: "Transaction type is required",
    invalid_type_error: "Transaction type must be either 'deposit' or 'withdraw'",
  }),
  amount: z
    .string()
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: "Amount must be a valid decimal number",
    }),
  description: z.string().nullable().optional(),
  branch: z.coerce.number().min(1, "Branch must be selected"),
  image_reset: z
    .custom<File | string | null>()
    .nullable()
    .refine(
      (file) => !file || typeof file === "string" || file instanceof File,
      {
        message: "Invalid file type",
      }
    )
    .refine(
      (file) =>
        file === null ||
        typeof file === "string" ||
        (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine(
      (file) =>
        file === null ||
        typeof file === "string" ||
        (file instanceof File && file.size <= MAX_FILE_SIZE),
      "Max image size is 5MB."
    ),
});
