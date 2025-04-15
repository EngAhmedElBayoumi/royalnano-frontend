import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Blogs | Royal Nano",
  description: "Learn more Profile our Royal Nano and team.",
};
const Blogs = () => {
  const t = useTranslations("website.blogs");
  return (
    <>
      <PageHeader title={t("title")} />
    </>
  );
};

export default Blogs;
