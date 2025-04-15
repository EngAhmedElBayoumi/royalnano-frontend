import { Skeleton } from "@/components/ui/skeleton";

const BlogsSkeleton = () => {
  return (
    <div className="main-container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <Skeleton className="w-full h-[230px] rounded-md" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsSkeleton;
