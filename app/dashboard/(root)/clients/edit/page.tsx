"use client";
import ClientForm from "@/components/dashboard/forms/ClientForm";
import { ClientFormValues } from "@/components/dashboard/forms/ClientForm"; // Adjust the import path as necessary
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

  return <ClientForm onSubmit={handleSubmit} defaultValues={defaultValues} />;
}
