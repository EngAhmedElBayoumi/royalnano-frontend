import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  return (
    <section className="flex justify-center flex-wrap">
      <main className="main-container flex items-center md:items-start gap-4 flex-col md:flex-row">
        <ProfileSidebar />
        <Tabs
          defaultValue="previous-services"
          className="mt-6 top-[-120px] relative md:static"
        >
          <TabsList className="bg-transparent gap-2 md:gap-8 flex-wrap">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border border-primary rounded-10 overflow-hidden"
                  >
                    <Image
                      src="/assets/images/thermal1.png"
                      alt="Service"
                      width={250}
                      height={200}
                      className="w-full"
                    />
                    <article className="bg-lightGray p-2">
                      <h3 className="font-semibold text-primary text-[20px]">
                        Daimond Hypred
                      </h3>
                      <p>Warranty: 5 Years</p>
                      <p>Country of manufacture: Use</p>
                    </article>
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
