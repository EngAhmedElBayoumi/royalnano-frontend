"use client";
import { useParams } from "next/navigation";
import { useGetBlogByIdQuery } from "@/redux/services/website/blogsApi";
import PageHeader from "@/components/PageHeader";
import BlogDetailsContent from "@/components/blogs/BlogDetails";

const BlogDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useGetBlogByIdQuery(id);

  return (
    <>
      {error || isLoading ? (
        <PageHeader title="" />
      ) : (
        <PageHeader title={data?.title} />
      )}
      <BlogDetailsContent id={id} />
    </>
  );
};

export default BlogDetails;
