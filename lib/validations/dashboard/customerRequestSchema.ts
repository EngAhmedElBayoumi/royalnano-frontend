import * as z from "zod";

// Example enums for select fields, replace with actual values from your endpoint
const carTypes = z.enum(["Sedan", "SUV", "Truck"]); // Replace with actual car types
const carModels = z.enum(["Model A", "Model B", "Model C"]); // Replace with actual car models
const services = z.enum(["Service 1", "Service 2", "Service 3"]); // Replace with actual services
const branches = z.enum(["Branch 1", "Branch 2", "Branch 3"]); // Replace with actual branches

export const customerRequestSchema = z.object({
  client_name: z.string().nonempty("Client name is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^\+?\d{1,3}[- ]?\d{1,4}[- ]?\d{1,4}[- ]?\d{1,9}$/,
      "Invalid phone number"
    ),
  car_type: carTypes,
  car_model: carModels,
  service: services,
  branch: branches,
  additional_notes: z.string().optional(),
});
