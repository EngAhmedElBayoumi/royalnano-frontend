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
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Client"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <ClientForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
