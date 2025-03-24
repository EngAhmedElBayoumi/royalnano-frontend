const ServicesSkeleton = () => {
  return (
    <div className="main-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-[200px] bg-gray300 rounded-lg"></div>
          <div className="h-4 bg-gray300 rounded mt-2 w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSkeleton;
