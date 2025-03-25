const ReviewsSkeleton = () => {
  return (
    <div className="main-container flex gap-[4%] overflow-hidden">
      {[...Array(4)].map((_, index) => (
        <section
          key={index}
          className="h-[370px] xl:h-[410px] flex items-center min-w-[280px] lg:min-w-[22%]"
        >
          <div className="w-full flex flex-col items-center pt-6 px-10 rounded-xl xl:rounded-2xl bg-lightGray h-[250px] xl:h-[280px] relative top-5 animate-pulse">
            <div className="w-[130px] h-[130px] rounded-full bg-gray300 absolute -top-20 border-8 border-white" />
            <section className="flex flex-col items-center gap-3 relative top-10 w-full">
              <div className="w-full h-4 bg-gray300 rounded" />
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[18px] h-[18px] bg-gray300 rounded-full"
                  />
                ))}
              </div>
              <div className="h-16 bg-gray300 rounded w-full mt-2" />
            </section>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReviewsSkeleton;
