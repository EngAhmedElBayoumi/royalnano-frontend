"use client";
import ServiceForm, {
  ServiceFormValues,
} from "@/components/dashboard/forms/website/ServiceForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useCreateServiceMutation } from "@/redux/services/website/servicesApi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CreateService() {
  const [createService] = useCreateServiceMutation();
  const router = useRouter();
  const t = useTranslations("website.Services");

  const handleSubmit = async (data: ServiceFormValues) => {
    try {
      await createService(data);
      router.push("/dashboard/website/services");
    } catch (error) {
      console.error("Error creating service:", error);
    }
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

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <ServiceForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
