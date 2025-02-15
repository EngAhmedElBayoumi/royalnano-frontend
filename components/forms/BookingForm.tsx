"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextInput from "../formFields/TextInput";
import CustomSelect from "../formFields/CustomSelect";
import { services } from "@/data/servicesData";
import { branches } from "@/data/branches";
import CustomTextArea from "../formFields/TextArea";
import CustomButton from "../formFields/CustomButton";
import { bookingValidation } from "@/lib/validations/bookingValidation";

export default function BookingForm({
  locale,

}: {
  locale: string ;
}) {
  console.log("locale sent to form ", locale)
  const form = useForm({
    resolver: zodResolver(bookingValidation),
    defaultValues: {
      full_name: "",
      car_type: "",
      service: "",
      additional_notes: "",
      branch: "",
      car_model: "",
      phone_number: "",
      order_notes: "",
    },
  });
  const onSubmit = async () => {};
  const serviceNames = services.map((service) => ({
    label: service.name,
    value: service.name,
  }));
  const branchesList = branches.map((branch) => ({
    label: branch,
    value: branch,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" gap-5 flex flex-col pt-[35px] pr-10 pl-7"
      >
        <div className=" grid grid-cols-1 lg:grid-cols-2">
          <div className={`  ${locale === "ar" ? "ml-4" : "mr-4"} flex flex-col gap-4 `}>
            <TextInput
              control={form.control}
              name="full_name"
              placeholder="Full Name"
              type="text"
              label="Full Name"
            />{" "}
            <TextInput
              control={form.control}
              name="car_type"
              placeholder="Car Type"
              type="text"
              label="Car Type"
            />{" "}
            <CustomSelect
            // className=" flex flex-row-reverse "
              control={form.control}
              name="service"
              options={serviceNames}
              label="service"
              placeholder="Choose service"
            />
          </div>
          <div className="flex flex-col gap-4">
            <TextInput
              name="phone_number"
              placeholder="Phone Number"
              label="Phone Number"
              // type="tel"
              control={form.control}
            />
            <TextInput
              name="car_model"
              placeholder="Car Model"
              label="Car Model"
              type="text"
              control={form.control}
            />

            <CustomSelect
              control={form.control}
              name="branch"
              options={branchesList}
              label="Choose branch"
              placeholder="Choose branch"
            />
          </div>
        </div>
        <CustomTextArea
          name="additional_notes"
          placeholder="additional notes"
          label="Additional Notes"
          control={form.control}
        />
        <CustomTextArea
          rows={1}
          name="order_notes"
          placeholder="Note About Your Order,e.g Special notes for delivery "
          label="Order notes (optional) "
          control={form.control}
        />

        <CustomButton
          className="bg-[#BD9D28]  text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-fit 
          shadow-[0px_14px_24px_0px_rgba(0,0,0,0.25)]
          "
          type="submit"
          text="Send"
        />
      </form>
    </Form>
  );
}
