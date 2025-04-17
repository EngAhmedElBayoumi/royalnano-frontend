import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailsSkeleton = () => {
  return (
    <main className="main-container">
      {/* Blog content section */}
      <section className="flex flex-wrap gap-5">
        {/* Image skeleton */}
        <Skeleton className="w-[500px] h-[300px] rounded-lg" />

        {/* Content skeleton */}
        <article className="flex-1 min-w-[300px]">
          <Skeleton className="w-3/4 h-6 mb-4" />
          <div className="space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </article>
      </section>

      {/* Comments section */}
      <section className="flex flex-wrap mt-8">
        <div className="w-[500px]" />
        <div className="flex-1 mt-4 min-w-[500px]">
          {/* Comment input skeleton */}
          <div className="flex">
            <Skeleton className="flex-1 h-[42px] rounded-none rounded-s-lg" />
            <Skeleton className="w-[120px] h-[42px] rounded-none rounded-e-lg" />
          </div>

          {/* Comments list skeleton */}
          <div className="mt-4 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <div className="flex-1">
                  <Skeleton className="w-[100px] h-4 mb-2" />
                  <Skeleton className="w-full h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetailsSkeleton;
