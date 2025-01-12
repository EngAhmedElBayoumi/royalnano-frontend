"use client";
import ClientForm from "@/components/dashboard/forms/ClientForm";
import { ClientFormValues } from "@/components/dashboard/forms/ClientForm"; // Adjust the import path as necessary
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateClientMutation } from "@/redux/services/clientApi"; // Adjust import as necessary

export default function EditClients() {
  //   const [updateClient] = useUpdateClientMutation();
  const defaultValues: ClientFormValues = {
    client_name: "", // Provide default values as needed
    email: "",
    phone_number: "",
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
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Edit Client"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <ClientForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
