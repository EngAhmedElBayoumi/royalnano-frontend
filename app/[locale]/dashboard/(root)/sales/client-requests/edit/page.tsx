"use client";
import ClientRequestForm, { ClientRequestFormValues } from "@/components/dashboard/forms/sales/ClientRequestForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomModal from "@/components/modals/CustomModal";
import { useRouter } from "@/i18n/routing";
import { useGetClientRequestByIdQuery, useUpdateClientRequestMutation } from "@/redux/services/clientRequestApi"; // Import the query to fetch existing data
import { useSearchParams } from "next/navigation";



export default function EditClientRequest() {
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
    const searchParams = useSearchParams();
  
  const id = searchParams.get("id");

  const [updateClientRequest] = useUpdateClientRequestMutation();
  const router = useRouter();

  const { data: clientRequest, isLoading: isFetching } = useGetClientRequestByIdQuery(id);

  const handleSubmit = async (data: ClientRequestFormValues) => {
    console.log("Form data submitted:", data);
    try {
      const result = await updateClientRequest({ id: id, ...data }).unwrap();
      console.log("Client request updated successfully!", result);
      router.push(`/dashboard/sales?tab=${t("client")}`);
    } catch (error) {
      console.error("Failed to update client request:", error);
      setIsModalOpen(true);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <CustomModal
          isOpen={isModalOpen}
          onChange={handleModalChange}
          title="Error!"
          description="Your Request wasn't processed successfully.."
        />
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title={t("editCustomer")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <ClientRequestForm
          defaultValues={clientRequest} 
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}