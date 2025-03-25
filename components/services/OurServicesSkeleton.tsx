const OurServicesSkeleton = () => {
  return (
    <main className="main-container grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[10%] items-center">
      <ul className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <li
            key={index}
            className="p-4 rounded-lg animate-pulse bg-lightGray cursor-pointer"
          >
            <div className="h-6 bg-gray300 rounded w-3/4"></div>
          </li>
        ))}
      </ul>
      <div className="animate-pulse">
        <div className="rounded-lg h-[350px] xl:h-[400px] w-full bg-gray300" />
      </div>
    </main>
  );
};

export default OurServicesSkeleton;