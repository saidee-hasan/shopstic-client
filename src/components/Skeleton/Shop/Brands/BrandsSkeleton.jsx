const BrandsSkeleton = () => {
  return (
    <div className="bg-gray-200 p-10 mb-20">
      <div className="my_container">
        {/* Marquee Skeleton */}
        <div className="overflow-hidden">
          <div className="flex items-center gap-10 animate-pulse">
            {[...Array(10).keys()].map((keys) => (
              <div key={keys} className="w-36 h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsSkeleton;
