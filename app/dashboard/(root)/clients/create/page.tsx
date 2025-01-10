// import { useCreateClientMutation } from "@/redux/services/clientApi"; // Adjust import as necessary
"use client";

import ClientForm, {
  ClientFormValues,
} from "@/components/dashboard/forms/ClientForm";

export default function CreateClients() {
  // const [createClient] = useCreateClientMutation();

  const handleSubmit = async (data: ClientFormValues) => {
    console.log(data);
    // await createClient(data);
  };

  return <ClientForm onSubmit={handleSubmit} />;
}
