const StoreSkeleton = () => {
  return (
    <div>
      <div className="p-5 bg-white rounded-xl">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12 gap-5">
          {/* Left Section */}
          <div className="xl:col-span-4 flex flex-col gap-3">
            {/* Store Image */}
            <div className="bg-gray-200 rounded-xl h-60 w-full animate-pulse"></div>
            {/* Banner Thumbnails */}
            <div className="grid grid-cols-4 gap-5">
              {[...Array(4).keys()].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 rounded-xl h-16 w-full animate-pulse"
                ></div>
              ))}
            </div>
            {/* View Store Button */}
            <div>
              <div className="bg-gray-300 h-10 rounded-xl w-full animate-pulse"></div>
            </div>
          </div>

          {/* Right Section */}
          <div className="xl:col-span-8 flex flex-col gap-5">
            {/* Header Section */}
            <div className="flex items-center flex-wrap justify-between gap-3">
              {/* Store Logo and Name */}
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 w-12 h-12 rounded-md animate-pulse"></div>
                <div className="bg-gray-200 h-6 w-32 animate-pulse rounded"></div>
              </div>
              {/* Ratings and Reviews */}
              <div>
                <div className="bg-gray-200 h-6 w-36 animate-pulse rounded mb-1"></div>
                <div className="flex items-center gap-1">
                  <div className="bg-gray-200 w-5 h-5 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-6 w-20 animate-pulse rounded"></div>
                </div>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-5">
              {[...Array(4).keys()].map((_, idx) => (
                <div
                  key={idx}
                  className="border shadow bg-gray-200 rounded-xl h-[178px] w-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSkeleton;
