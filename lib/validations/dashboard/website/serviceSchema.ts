import * as z from "zod";

export const serviceSchema = z.object({
  serviceName: z.string().nonempty("Service name is required"),
  type: z.string().nonempty("Type is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  image: z.instanceof(File).refine((file) => file instanceof File, {
    message: "Image is required",
  }),
  date: z.date({ required_error: "Date is required" }),
});
