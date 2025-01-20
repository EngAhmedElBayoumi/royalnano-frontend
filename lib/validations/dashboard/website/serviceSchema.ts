import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const serviceSchema = z.object({
  serviceName: z.string().nonempty("Service name is required"),
  type: z.string().nonempty("Type is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  image: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "Image is required",
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`),
});
