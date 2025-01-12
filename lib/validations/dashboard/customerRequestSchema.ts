import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

const carTypes = z.enum(["Sedan", "SUV", "Truck"]);
const carModels = z.enum(["Model A", "Model B", "Model C"]);
const services = z.enum(["Service 1", "Service 2", "Service 3"]);
const branches = z.enum(["Branch 1", "Branch 2", "Branch 3"]);

export const customerRequestSchema = z.object({
  client_name: z.string().nonempty("Client name is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  car_type: carTypes,
  car_model: carModels,
  service: services,
  branch: branches,
  additional_notes: z.string().optional(),
});
