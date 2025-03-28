"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ProfileSidebar from "./ProfileSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "@/components/cards/ServiceCard";
import ProfileForm from "./ProfileForm";
import { useGetSalesSalesClientRequestQuery } from "@/redux/services/dashboard/sales/salesClientRequests";
import CustomButton from "../formFields/CustomButton";
import { useCreateInitialPriceMutation } from "@/redux/services/dashboard/sales/initialPriceApi";

// import { toast } from "sonner"; // Make sure to import toast if you're using it

const Profile = () => {
  const t = useTranslations("website.profile");
  const locale = useParams()?.locale as string;
  const { data } = useGetSalesSalesClientRequestQuery({});
  const [createInitialPrice] = useCreateInitialPriceMutation();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handlePayment = async (serviceId: number) => {
    setIsProcessingPayment(true);
    try {
      const payload = { request_id: serviceId };
      const res = await createInitialPrice(payload).unwrap();

      if (res?.payment_url) {
        window.location.replace(res.payment_url);
      } else {
        // toast.error(t("payment.noUrl"));
        console.error("No payment URL in response");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      // toast.error(t("payment.failed"));
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <section className="flex justify-center flex-wrap">
      <main className="main-container flex items-center md:items-start gap-5 flex-col md:flex-row">
        <ProfileSidebar />
        <Tabs
          dir={locale === "ar" ? "rtl" : "ltr"}
          defaultValue="previous-services"
          className="md:static pt-5"
        >
          <TabsList className="bg-transparent gap-8 flex-wrap p-0">
            <TabsTrigger
              value="previous-services"
              className="p-0 md:text-sm xl:text-md !font-semibold"
            >
              {t("tabs.previousServices")}
            </TabsTrigger>
            <TabsTrigger
              value="edit-profile"
              className="p-0 md:text-sm xl:text-md !font-semibold"
            >
              {t("tabs.editProfile")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="previous-services">
            <div className="justify-center grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-[90vw] md:w-fit">
              {data?.map(
                (service: {
                  id: number;
                  car_type: string;
                  car_model: string;
                  description: string;
                  service: { image: string };
                  initial_price?: number;
                  status?: string;
                }) => (
                  <div key={service.id} className="flex flex-col">
                    <Link href={`/services/${service.id}`} passHref>
                      <ServiceCard
                        title={service.car_type}
                        warranty={service.car_model}
                        country={service.description}
                        imageSrc={service.service.image}
                      />
                    </Link>
                    {service.initial_price && (
                      <h2 className="text-sm font-medium mt-2">
                        {t("payment.initialPrice")}: {service.initial_price}
                      </h2>
                    )}
                    {service.status === "approved" && (
                      <CustomButton
                        text={t("payment.payButton")}
                        onClick={() => handlePayment(service.id)}
                        isDisabled={isProcessingPayment}
                        className="mt-2"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </TabsContent>

          <TabsContent value="edit-profile">
            <ProfileForm />
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default Profile;
