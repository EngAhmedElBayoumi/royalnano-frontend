"use client";
import React from "react";
import Image from "next/image";
import { useGetBlogByIdQuery } from "@/redux/services/website/blogsApi";
import LoadingError from "@/components/dashboard/LoadingError";
import Comments from "./Comments";
import BlogDetailsSkeleton from "./BlogDetailsSkeleton";

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
        <BlogDetailsSkeleton />
      ) : (
        <main className="main-container">
          <section className="flex flex-wrap gap-5">
            <Image
              src={data?.image}
              alt={data?.title}
              width={500}
              height={300}
              className="rounded-lg"
            />
            <article>
              <h1 className="text-sm xl:text-[20px] font-bold mb-2">
                {data?.title}
              </h1>
              <p className="text-gray">{data?.content}</p>
            </article>
          </section>
          <section className="flex flex-wrap">
            <div className="w-[500px]"></div>
            <Comments blogId={id} comments={data?.comments} />
          </section>
        </main>
      )}
    </section>
  );
};

export default BlogDetails;
