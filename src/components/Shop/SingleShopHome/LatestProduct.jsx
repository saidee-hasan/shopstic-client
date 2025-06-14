import { FaSpinner } from "react-icons/fa";
import { useGetSellerLatestProductsQuery } from "../../../store/shop/service/sellerProduct/sellerProductApi";
import SingleShopProductCard from "./SingleShopProductCard";
import PropTypes from "prop-types";
import { useState } from "react";
import SelectInput from "../../Common/SelectInput";

const LatestProduct = ({ sellerId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const query = new URLSearchParams({
    sellerId,
    page: currentPage,
    limit,
  }).toString();

  const { data, isLoading } = useGetSellerLatestProductsQuery(query);
  const pages = Math.ceil(Math.abs(data?.total ?? 0) / limit);

  return (
    <>
      {!isLoading ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {data?.data?.map((product) => (
              <div key={product?._id} className="h-full">
                <SingleShopProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-5">
            <div className={`flex gap-3 items-center`}>
              {[...Array(pages ? pages : 0).keys()]?.map((page) => (
                <div key={page}>
                  <div
                    onClick={() => setCurrentPage(page)}
                    key={page}
                    className={` py-1.5 px-3 cursor-pointer rounded-md text-black ${
                      currentPage == page ? "bg-accent" : "bg-white"
                    }`}
                  >
                    <span className="font-bold">{page + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            <SelectInput
              onChange={(event) => {
                setLimit(parseInt(event.target.value)), setCurrentPage(0);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </SelectInput>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      )}
    </>
  );
};

LatestProduct.propTypes = {
  sellerId: PropTypes.string,
};
export default LatestProduct;
