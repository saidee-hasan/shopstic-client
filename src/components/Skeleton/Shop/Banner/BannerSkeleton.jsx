const BannerSkeleton = () => {
  return (
    <div className="mt-[80px] lg:mt-24 xl:mt-[100px]">
      <div className="h-full lg:grid lg:grid-cols-12 gap-5">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-3 h-full w-full mt-5 lg:mt-0 hidden lg:block">
          <div className="h-full w-full bg-gray-200 animate-pulse">
            <div className="flex flex-col items-center justify-between h-full w-full pt-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-gray-300"></div>
                <div className="w-24 h-6 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-3 bg-gray-300 px-5 py-2 rounded-full"></div>
                <div className="w-40 h-4 bg-gray-300 rounded mt-4"></div>
              </div>
              <div className="border-t w-full flex flex-col items-center justify-center pt-3">
                <div className="w-32 h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full bg-gray-200 h-full col-span-full lg:col-span-9 border-r-4 border-b-4">
          <div className="h-[220px] md:h-[360px] lg:h-[460px] bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
