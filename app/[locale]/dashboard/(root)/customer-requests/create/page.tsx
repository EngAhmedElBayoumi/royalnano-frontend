// import { useCreateCustomerRequestMutation } from "@/redux/services/CustomerRequestApi";
"use client";
import CustomerRequestForm, {
  CustomerRequestFormValues,
} from "@/components/dashboard/forms/CustomerRequestForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";

export default function CreateCustomerRequests() {
  // const [createCustomerRequest] = useCreateCustomerRequestMutation();

  const handleSubmit = async (data: CustomerRequestFormValues) => {
    console.log(data);
    // await createCustomerRequest(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Customer Request"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <CustomerRequestForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
