// import { useCreateClientMutation } from "@/redux/services/clientApi"; // Adjust import as necessary
"use client";

import ClientForm, {
  ClientFormValues,
} from "@/components/dashboard/forms/ClientForm";

export default function CreateCustomerRequests() {
  // const [createClient] = useCreateClientMutation();

  const handleSubmit = async (data: ClientFormValues) => {
    console.log(data);
    // await createClient(data);
  };

  return (
    <main className="mx-7">
      <ClientForm onSubmit={handleSubmit} />
    </main>
  );
}
