import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  return (
    <section className="flex justify-center">
      <main className="main-container flex gap-4">
        <ProfileSidebar />
        <Tabs defaultValue="previous-services" className="mt-6">
          <TabsList>
            <TabsTrigger value="previous-services">
              Previous Services
            </TabsTrigger>
            <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="previous-services">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">Daimond Hypred</h3>
                    <p>Warranty: 5 Years</p>
                    <p>Country of manufacture: Use</p>
                    <Image
                      src="/path/to/service-image.jpg"
                      alt="Service"
                      width={200}
                      height={150}
                      className="mt-2"
                    />
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="edit-profile">
            <div className="mt-4">
              <label className="block mb-2" htmlFor="full-name">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                placeholder="Full Name"
                className="border rounded-lg p-2 w-full mb-4"
              />
              <label className="block mb-2" htmlFor="phone-number">
                Phone Number
              </label>
              <input
                type="text"
                id="phone-number"
                placeholder="Phone Number"
                className="border rounded-lg p-2 w-full mb-4"
              />
              <button className="bg-gold text-white rounded-lg px-4 py-2">
                Save
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default Profile;
