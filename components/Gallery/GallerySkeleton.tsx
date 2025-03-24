const GallerySkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(12)].map((_, index) => (
      <div key={index} className="animate-pulse space-y-2">
        <div className="h-[310px] bg-gray-300 rounded-lg w-full"></div>
      </div>
    ))}
  </div>
);

export default GallerySkeleton;