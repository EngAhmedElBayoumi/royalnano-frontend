"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextInput from "../formFields/TextInput";
import CustomSelect from "../formFields/CustomSelect";
import CustomTextArea from "../formFields/TextArea";
import CustomButton from "../formFields/CustomButton";
import { bookingValidation } from "@/lib/validations/bookingValidation";
import { useCreateClientRequestMutation } from "@/redux/services/clientRequestApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import PhoneInputField from "../formFields/PhoneInputField";

type FormData = {
  full_name: string;
  car_type: string;
  service: number;
  description: string;
  branch: number;
  car_model: string;
  phone_number: string;
  order_note: string;
  status: string;
};

export default function BookingForm({ locale }: { locale: string }) {
  const form = useForm<FormData>({
    resolver: zodResolver(bookingValidation),
    defaultValues: {
      full_name: "",
      car_type: "",
      service: 0,
      description: "",
      branch: 0,
      car_model: "",
      phone_number: "",
      order_note: "",
      status: "pending",
    },
  });

  const [createClientRequest, { isLoading: isCreating }] = useCreateClientRequestMutation();
  const { data: branchesData, isLoading: isBranchesLoading } = useGetBranchesQuery({});
  const { data: servicesData, isLoading: isServicesLoading } = useGetServicesQuery({});
const router = useRouter()
  const onSubmit = async (data: FormData) => {
    const payload = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      car_type: data.car_type,
      car_model: data.car_model,
      status: data.status,
      description: data.description,
      order_note: data.order_note,
      service: Number(data.service),
      branch: Number(data.branch),
    };

    try {
    const res=  await createClientRequest(payload).unwrap();
    console.log(res)
      console.log("Request created successfully!");
      router.push("/")
      form.reset(); 
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const { errors } = form.formState;
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
    }
  }, [errors]);

  const serviceNames = servicesData?.results?.map((service) => ({
    value: String(service.id),
    label: service.name,
  })) || [];

  const branchesList = branchesData?.results?.map((branch) => ({
    value: String(branch.id),
    label: branch.name,
  })) || [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 flex flex-col pt-[35px] pr-10 pl-7"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className={`${locale === "ar" ? "ml-4" : "mr-4"} flex flex-col gap-4`}>
            <TextInput
              control={form.control}
              name="full_name"
              placeholder="Full Name"
              type="text"
              label="Full Name"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name.message}</p>
            )}
            <TextInput
              control={form.control}
              name="car_type"
              placeholder="Car Type"
              type="text"
              label="Car Type"
            />
            {errors.car_type && (
              <p className="text-red-500 text-sm">{errors.car_type.message}</p>
            )}
            <CustomSelect
              valueType="number"
              control={form.control}
              name="service"
              options={serviceNames}
              label="Service"
              placeholder="Choose service"
              isLoading={isServicesLoading}
            />
            {errors.service && (
              <p className="text-red-500 text-sm">{errors.service.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {/* <TextInput
              name="phone_number"
              placeholder="Phone Number"
              label="Phone Number"
              control={form.control}
            /> */}
              <PhoneInputField
               name="phone_number"
              //  placeholder="Phone Number"
               label="Phone Number"
               control={form.control}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
            )}
            <TextInput
              name="car_model"
              placeholder="Car Model"
              label="Car Model"
              type="text"
              control={form.control}
            />
            {errors.car_model && (
              <p className="text-red-500 text-sm">{errors.car_model.message}</p>
            )}
            <CustomSelect
              valueType="number"
              control={form.control}
              name="branch"
              label="Choose Branch"
              placeholder="Choose branch"
              options={branchesList}
              isLoading={isBranchesLoading}
            />
            {errors.branch && (
              <p className="text-red-500 text-sm">{errors.branch.message}</p>
            )}
          </div>
        </div>
        <CustomTextArea
          name="description"
          placeholder="Description"
          label="Description"
          control={form.control}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <CustomTextArea
          rows={1}
          name="order_note"
          placeholder="Note About Your Order, e.g. Special notes for delivery"
          label="Order notes (optional)"
          control={form.control}
        />
        {errors.order_note && (
          <p className="text-red-500 text-sm">{errors.order_note.message}</p>
        )}

        <CustomButton
          className="bg-[#BD9D28] text-white py-1.5 rounded-xl px-[71px] md:text-sm xl:text-md w-fit shadow-[0px_14px_24px_0px_rgba(0,0,0,0.25)]"
          type="submit"
          text="Send"
          disabled={isCreating || isBranchesLoading || isServicesLoading}
        />
      </form>
    </Form>
  );
}