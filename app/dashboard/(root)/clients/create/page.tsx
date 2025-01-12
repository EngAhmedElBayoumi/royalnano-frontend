// import { useCreateClientMutation } from "@/redux/services/clientApi";
"use client";

import ClientForm, {
  ClientFormValues,
} from "@/components/dashboard/forms/ClientForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";

export default function CreateClients() {
  // const [createClient] = useCreateClientMutation();

  const handleSubmit = async (data: ClientFormValues) => {
    console.log(data);
    // await createClient(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Client"
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
