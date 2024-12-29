import Profile from "@/components/Profile/Profile";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Profile | Royal Nano",
  description: "Learn more Profile our Royal Nano and team.",
};
export default function ProfilePage() {
  return (
    <>
      <PageHeader title="profile" />
      <div className="relative top-[-160px]">
        <Profile />
      </div>
    </>
  );
}
