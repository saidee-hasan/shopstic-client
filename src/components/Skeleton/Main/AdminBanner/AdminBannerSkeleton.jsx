const AdminBannerSkeleton = () => {
  return (
    <div className="mt-[80px] lg:mt-24 xl:mt-[100px]">
      <div className="h-full lg:grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3 h-full w-full mt-5 lg:mt-0">
        <div className="h-[200px] md:h-[350px] xl:h-[460px] w-full bg-gray-300 animate-pulse"></div>
        </div>
        <div className="w-full h-full col-span-full lg:col-span-9 border-r-4 border-b-4">
          <div className="h-[200px] md:h-[350px] xl:h-[460px] w-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminBannerSkeleton;
