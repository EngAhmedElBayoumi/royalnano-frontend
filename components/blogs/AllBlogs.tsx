"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Paginator } from "primereact/paginator";
import { useGetBlogsQuery } from "@/redux/services/website/blogsApi";
import BlogCard from "@/components/cards/BlogCard";
import LoadingError from "@/components/dashboard/LoadingError";
import NoData from "@/components/NoData";
import BlogsSkeleton from "./BlogsSkeleton";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
}

const AllBlogs = () => {
  const t = useTranslations("website.blogs");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetBlogsQuery({
    page,
    page_size: 8,
  });

  const Blogs = data?.results || [];
  const totalRecords = data?.count || 0;

  return (
    <section className="pb-8 bg-white relative top-[-100px] animate-on-scroll">
      <div className="flex justify-center flex-col items-center">
        {error ? (
          <LoadingError />
        ) : isLoading ? (
          <BlogsSkeleton />
        ) : Blogs?.length === 0 ? (
          <NoData message={t("noData")} />
        ) : (
          <main className="main-container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Blogs.map((Blog: Blog) => (
              <BlogCard
                key={Blog.id}
                id={Blog.id}
                title={Blog.title}
                image={Blog.image}
                content={Blog.content}
              />
            ))}
          </main>
        )}
      </div>
      {totalRecords > 8 && (
        <div className="mt-6 flex justify-center">
          <Paginator
            first={(page - 1) * 8}
            rows={8}
            totalRecords={totalRecords}
            onPageChange={(e) => setPage(e.page + 1)}
          />
        </div>
      )}
    </section>
  );
};

export default AllBlogs;
