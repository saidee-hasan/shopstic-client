import { FaClipboard } from "react-icons/fa";
import StoreBanner from "../../../components/Main/Store/StoreBanner";
import StoreCard from "../../../components/Main/Store/StoreCard";
import StoreSkeleton from "../../../components/Skeleton/Shop/Store/StoreSkeleton";
import { useGetAllSellerQuery } from "../../../store/main/service/allSeller/allSellerApi";
import StoreFilterTop from "../../../components/Main/Store/StoreFilterTop";
import { useState } from "react";
import Pagination from "../../../components/Common/Pagination";

const Store = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedValue, setSortedValue] = useState("1");

  const query = new URLSearchParams({
    limit,
    page: currentPage,
    sortedValue,
  });

  const { data, isLoading } = useGetAllSellerQuery({
    query: query.toString(),
  });

  const pages = Math.ceil(Math.abs(data?.total ?? 0) / limit);

  return (
    <section>
      <div className="my_container my-[80px] lg:my-28 xl:my-[100px]">
        <StoreBanner />
        <div>
          <StoreFilterTop
            total={data?.total}
            setLimit={setLimit}
            setSortedValue={setSortedValue}
            sortedValue={sortedValue}
          />
        </div>
        <div>
          {!isLoading ? (
            <div className="flex flex-col gap-5">
              {data?.data?.length ? (
                data?.data?.map((seller) => (
                  <StoreCard key={seller?._id} seller={seller} />
                ))
              ) : (
                <div className="flex gap-5 flex-col items-center justify-center w-full h-80 bg-white">
                  <FaClipboard className="text-8xl text-slate" />
                  <span className="font-medium text-xl text-accent capitalize">
                    Seller data not found
                  </span>
                </div>
              )}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
                key={"store_pagination"}
              />
            </div>
          ) : (
            <StoreSkeleton />
          )}
        </div>
      </div>
    </section>
  );
};

export default Store;
