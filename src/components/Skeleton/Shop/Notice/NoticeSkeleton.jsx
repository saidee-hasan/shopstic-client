const NoticeSkeleton = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-full my-10">
      <div className="overflow-hidden animate-pulse">
        <div className="w-full h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default NoticeSkeleton;
