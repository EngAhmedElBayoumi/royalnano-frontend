import * as z from "zod";

export const aboutSchema = z.object({
  image: z.instanceof(File).refine((file) => file instanceof File, {
    message: "Image is required",
  }),
  description: z
    .string()
    .min(1, "Description is required")
    .refine((value) => {
      // Additional validation for HTML content
      const doc = new DOMParser().parseFromString(value, "text/html");
      return doc.body.childNodes.length > 0; // Ensure there is at least one child node
    }, "Description must contain valid HTML content."),
});
