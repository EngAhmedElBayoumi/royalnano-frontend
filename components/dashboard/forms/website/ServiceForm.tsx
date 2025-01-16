"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/lib/validations/dashboard/website/serviceSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import FileInput from "@/components/formFields/FileInput";
import DateTimePicker from "@/components/formFields/DateTimePicker";

interface ServiceFormProps {
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  defaultValues?: ServiceFormValues;
}

export interface ServiceFormValues {
  serviceName: string;
  type: string;
  price: number;
  image: File;
  date: Date;
}

const ServiceForm = ({ onSubmit, defaultValues }: ServiceFormProps) => {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues || {
      serviceName: "",
      type: "",
      price: 0,
      image: undefined,
      date: new Date(),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="serviceName"
              label="Service Name"
              placeholder="Service Name"
            />
            <TextInput
              control={form.control}
              name="type"
              label="Type"
              placeholder="Type"
            />
            <TextInput
              control={form.control}
              name="price"
              label="Price"
              placeholder="Price"
              type="number"
            />
            <FileInput control={form.control} name="image" label="Image" />
            <DateTimePicker
              control={form.control}
              name="date"
              label="Date"
              placeholder="Date"
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <CustomButton
            text="Cancel"
            type="reset"
            className="text-white rounded-lg bg-black min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
          <CustomButton
            text="Save"
            className="text-white rounded-lg bg-gold min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
