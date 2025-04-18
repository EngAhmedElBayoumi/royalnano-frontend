"use client";
import ClientForm from "@/components/dashboard/forms/ClientForm";
import { ClientFormValues } from "@/components/dashboard/forms/ClientForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateClientMutation } from "@/redux/services/clientApi";

export default function EditClients() {
  //   const [updateClient] = useUpdateClientMutation();
  const defaultValues: ClientFormValues = {
    client_name: "Yasmine", // Provide default values as needed
    email: "yasmine@gmaik.com",
    phone_number: "0123456789",
    facility_name: "",
    tax_number: "",
    address: "",
    city: "",
    area: "",
    building_number: "",
    website: "", // Optional
    condition: "", // Optional
  }; // Fetch existing client data and set as default values

  const handleSubmit = async (data: ClientFormValues) => {
    console.log(data);

    // await updateClient(data);
  };

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Client"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <ClientForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
