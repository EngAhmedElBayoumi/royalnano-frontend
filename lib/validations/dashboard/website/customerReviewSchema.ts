import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const customerReviewSchema = z.object({
  name: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Name must be less than 100 characters"),
  review: z
    .string()
    .min(1, "Review comment is required")
    .max(500, "Comment must be less than 500 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  image: z
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
        !file ||
        typeof file === "string" ||
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine(
      (file) => !file || typeof file === "string" || file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    ),
});
