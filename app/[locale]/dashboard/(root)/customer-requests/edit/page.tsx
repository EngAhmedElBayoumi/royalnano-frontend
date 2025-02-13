"use client";
import CustomerRequestForm from "@/components/dashboard/forms/CustomerRequestForm";
import { CustomerRequestFormValues } from "@/components/dashboard/forms/CustomerRequestForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateCustomerRequestMutation } from "@/redux/services/CustomerRequestApi";

export default function EditCustomerRequests() {
  //   const [updateCustomerRequest] = useUpdateCustomerRequestMutation();
  const defaultValues: CustomerRequestFormValues = {
    client_name: "Yasmine",
    phone_number: "0123456789",
    car_type: "Sedan",
    car_model: "Toyota",
    service: "Oil Change",
    branch: "Cairo",
    additional_notes: "No additional notes",
  }; // Fetch existing CustomerRequest data and set as default values

  const handleSubmit = async (data: CustomerRequestFormValues) => {
    console.log(data);
    // await updateCustomerRequest(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Customer Request"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <CustomerRequestForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      </div>
    </main>
  );
}
