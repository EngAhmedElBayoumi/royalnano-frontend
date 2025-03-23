import Profile from "@/components/Profile/Profile";
import PageHeader from "@/components/PageHeader";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Profile | Royal Nano",
  description: "Learn more Profile our Royal Nano and team.",
};
export default function ProfilePage() {
  const t = useTranslations("website.profile");
  return (
    <>
      <PageHeader title={t("title")} />
      <div className="relative top-[-160px]">
        <Profile />
      </div>
    </>
  );
}
