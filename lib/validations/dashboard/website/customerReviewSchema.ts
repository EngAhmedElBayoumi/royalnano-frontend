import * as z from "zod";

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
  image: z.string().optional(),
});
