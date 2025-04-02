import { z } from "zod";

export const jobsSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  permissions: z.array(
    z.coerce.number().min(1, "At least one permission is required")
  ),
});
