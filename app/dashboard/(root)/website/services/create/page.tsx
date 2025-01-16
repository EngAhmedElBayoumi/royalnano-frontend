"use client";
import ServiceForm, {
  ServiceFormValues,
} from "@/components/dashboard/forms/website/ServiceForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateServiceMutation } from "@/redux/services/WebsiteApi";

export default function CreateService() {
  // const [createService] = useCreateServiceMutation();

  const handleSubmit = async (data: ServiceFormValues) => {
    console.log(data);
    // await createService(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Service"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <ServiceForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
