"use client";
import React from "react";
import Image from "next/image";
import { useGetBlogByIdQuery } from "@/redux/services/website/blogsApi";
import LoadingError from "@/components/dashboard/LoadingError";

interface BlogDetailsProps {
  id: string;
}
const BlogDetails: React.FC<BlogDetailsProps> = ({ id }) => {
  const { data, isLoading, error } = useGetBlogByIdQuery(id);

  return (
    <section className="pb-8 relative top-[-130px] animate-on-scroll flex flex-col justify-center items-center">
      {error ? (
        <LoadingError />
      ) : isLoading ? (
        <>loading... </>
      ) : (
        <main className="main-container flex flex-wrap gap-5">
          <Image
            src={data?.image}
            alt={data?.title}
            width={500}
            height={300}
            className="rounded-lg"
          />
          <div className="h-[300px] overflow-y-auto">
            <h1 className="text-sm xl:text-[20px] font-bold mb-2">
              {data?.title}
            </h1>
            <p className="text-gray">{data?.content}</p>
          </div>
        </main>
      )}
    </section>
  );
};

export default BlogDetails;
