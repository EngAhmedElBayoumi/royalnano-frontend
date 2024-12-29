"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSidebar from "./ProfileSidebar";
import ServiceCard from "@/components/cards/ServiceCard";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const services = [
    {
      title: "Daimond Hypred",
      warranty: "5 Years",
      country: "Use",
      imageSrc: "/assets/images/thermal1.png",
    },
    {
      title: "Service 2",
      warranty: "2 Years",
      country: "Country 2",
      imageSrc: "/assets/images/thermal1.png",
    },
    {
      title: "Service 3",
      warranty: "3 Years",
      country: "Country 3",
      imageSrc: "/assets/images/thermal1.png",
    },
    {
      title: "Service 4",
      warranty: "1 Year",
      country: "Country 4",
      imageSrc: "/assets/images/thermal1.png",
    },
    {
      title: "Service 5",
      warranty: "6 Months",
      country: "Country 5",
      imageSrc: "/assets/images/thermal1.png",
    },
    {
      title: "Service 6",
      warranty: "1 Year",
      country: "Country 6",
      imageSrc: "/assets/images/thermal1.png",
    },
  ];

  return (
    <section className="flex justify-center flex-wrap">
      <main className="main-container flex items-center md:items-start gap-5 flex-col md:flex-row">
        <ProfileSidebar />
        <Tabs
          defaultValue="previous-services"
          className="mt-6 top-[-120px] relative md:static"
        >
          <TabsList className="bg-transparent gap-2 md:gap-8 flex-wrap p-0">
            <TabsTrigger
              value="previous-services"
              className="p-0 text-xs md:text-md !font-semibold"
            >
              Previous Services
            </TabsTrigger>
            <TabsTrigger
              value="edit-profile"
              className="p-0 text-xs md:text-md !font-semibold"
            >
              Edit Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="previous-services">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  warranty={service.warranty}
                  country={service.country}
                  imageSrc={service.imageSrc}
                />
              ))}
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
