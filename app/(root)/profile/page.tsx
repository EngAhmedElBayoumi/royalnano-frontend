import Profile from "@/components/Profile/Profile";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Profile | Royal Nano",
  description: "Learn more Profile our Royal Nano and team.",
};
export default function ProfilePage() {
  return (
    <>
      <Hero />
      <div className="relative top-[-160px]">
        <Profile />
      </div>
    </>
  );
}
