import * as z from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name is required")
    .max(100, "Department name must be less than 100 characters"),
  max_leave_percentage: z
    .number()
    .min(0, "Max leave percentage must be greater than 0")
    .max(100, "Max leave percentage must be less than 100"),
  extra_fields: z.record(z.any()).optional(),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;
