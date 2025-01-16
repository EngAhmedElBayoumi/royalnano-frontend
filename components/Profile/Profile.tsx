"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSidebar from "./ProfileSidebar";
import ServiceCard from "@/components/cards/ServiceCard";
import ProfileForm from "./ProfileForm";
import Link from "next/link";
import { services } from "@/data/profileServices";
// import { useGetProfileQuery } from "@/redux/services/profileApi";

const Profile = () => {
  // const { data, isLoading, error } = useGetProfileQuery();

  return (
    <section className="flex justify-center flex-wrap">
      <main className="main-container flex items-center md:items-start gap-5 flex-col md:flex-row">
        <ProfileSidebar />
        <Tabs
          defaultValue="previous-services"
          className="top-[-75px] relative md:static"
        >
          <TabsList className="bg-transparent gap-8 flex-wrap p-0">
            <TabsTrigger
              value="previous-services"
              className="p-0 md:text-sm xl:text-md !font-semibold"
            >
              Previous Services
            </TabsTrigger>
            <TabsTrigger
              value="edit-profile"
              className="p-0 md:text-sm xl:text-md !font-semibold"
            >
              Edit Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="previous-services">
            <div className="justify-center grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-[90vw] md:w-fit">
              {services.map((service, index) => (
                <Link key={index} href={`/services/${service.id}`} passHref>
                  <ServiceCard
                    title={service.title}
                    warranty={service.warranty}
                    country={service.country}
                    imageSrc={service.imageSrc}
                  />
                </Link>
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
