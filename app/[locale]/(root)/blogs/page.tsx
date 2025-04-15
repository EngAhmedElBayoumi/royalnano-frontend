import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import AllBlogs from "@/components/blogs/AllBlogs";

export const metadata = {
  title: "Blogs | Royal Nano",
  description: "Learn more Profile our Royal Nano and team.",
};
const Blogs = () => {
  const t = useTranslations("website.blogs");
  return (
    <>
      <PageHeader title={t("title")} />
      <AllBlogs />
    </>
  );
};

export default Blogs;
