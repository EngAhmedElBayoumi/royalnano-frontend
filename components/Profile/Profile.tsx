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
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Profile = () => {
  const t = useTranslations("website.profile");
  const locale = useParams()?.locale as string;
  const { data } = useGetSalesSalesClientRequestQuery({});
  const [createPayment] = useCreateInitialPriceMutation();
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const handlePayment = async (serviceId: number) => {
    try {
      const res = await createPayment(serviceId).unwrap();
      if (res?.payment_url) {
        setPaymentUrl(res.payment_url);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const closePaymentModal = () => {
    setPaymentUrl(null);
  
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
              {data?.map((service) => (
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
                    <h2>Initial Price: {service.initial_price}</h2>
                  )}
                  {service.status === "approved" && (
                    <CustomButton 
                      text="Pay" 
                      onClick={() => handlePayment(service.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="edit-profile">
            <ProfileForm />
          </TabsContent>
        </Tabs>

        <Dialog open={!!paymentUrl} onOpenChange={closePaymentModal}>
          <DialogContent className="max-w-[800px] w-[90vw] h-[70vh] p-0 overflow-hidden">
            {paymentUrl && (
              <iframe 
                src={paymentUrl}
                className="w-full h-full border-0 rounded-lg"
                allowFullScreen
                allow="payment *"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </section>
  );
};

export default Profile;