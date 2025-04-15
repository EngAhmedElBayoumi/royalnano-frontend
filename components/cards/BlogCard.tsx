import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, content, image }) => {
  const t = useTranslations("website.blogs");

  return (
    <>
      <Image
        src={image ?? "/assets/images/diamond-hybrid.png"}
        alt={title}
        width={270}
        height={200}
        className="w-full h-[230px] rounded-md object-cover"
      />
      <h2 className="fw-bold text-sm xl:text-md">{title}</h2>
      <div className="h-100 flex  justify-between items-center">
        <p className="text-gray-500">
          {content?.substring(0, 50)} {content?.length > 50 && "..."}
        </p>
        <Link
          href={`/blogs/${id}`}
          passHref
          className="capitalize text-primary"
        >
          {t("readMore")}
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
