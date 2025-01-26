import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const gallerySchema = z
  .object({
    title: z.string().nonempty("Title is required"),
    item_type: z.enum(["image", "video"]),
    file: z.instanceof(File, { message: "File is required" }),
  })
  .superRefine((data, ctx) => {
    const { item_type, file } = data;

    if (item_type === "image") {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        ctx.addIssue({
          path: ["file"],
          code: z.ZodIssueCode.custom,
          message:
            "Only .jpg, .jpeg, .png, .webp formats are supported for images.",
        });
      }
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          path: ["file"],
          code: z.ZodIssueCode.custom,
          message: "Max image size is 5MB.",
        });
      }
    } else if (item_type === "video") {
      if (!file.type.startsWith("video/")) {
        ctx.addIssue({
          path: ["file"],
          code: z.ZodIssueCode.custom,
          message: "Only video formats are supported.",
        });
      }
      if (file.size > MAX_FILE_SIZE * 20) {
        ctx.addIssue({
          path: ["file"],
          code: z.ZodIssueCode.custom,
          message: "Max video size is 100MB.",
        });
      }
    }
  });
