import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const serviceSchema = z.object({
  name: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Name must be less than 100 characters"),
  alias: z
    .string()
    .min(1, "Alias is required")
    .max(100, "Alias must be less than 100 characters"),
  description: z.string().min(1, "Description is required"),
  image: z
    .custom<File | null>()
    .nullable()
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file type",
    })
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    ),
});
